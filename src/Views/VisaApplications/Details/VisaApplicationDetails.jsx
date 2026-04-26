import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useApi from "../../../Hooks/useApi";
import useGoBack from "../../../Hooks/useGoBack";
import AdminLayout from "../../../Layout/AdminLayout";
import Loading from "../../../Utils/Components/Loading";
import VisaApplicationActions from "./VisaApplicationActions";
import VisaApplicationDetailsHeader from "./VisaApplicationDetailsHeader";
import VisaApplicationDocuments from "./VisaApplicationDocuments";
import VisaApplicationOverview from "./VisaApplicationOverview";
import VisaApplicationPayments from "./VisaApplicationPayments";
import VisaApplicationStatusLogs from "./VisaApplicationStatusLogs";
import { VISA_APPLICATIONS_TEXT } from "../text";

const defaultAssignmentData = {
  officer_id: "",
  remarks: "Assigned to visa officer",
};

const defaultAdminUpdateData = {
  assigned_to: "",
  remarks: "",
};

const defaultStatusData = {
  status: "",
  remarks: "",
};

const getResourceUrl = (path) => {
  const baseUrl = import.meta.env.VITE_IMAGE_URL ?? "";
  if (!path) {
    return "#";
  }
  return `${baseUrl}${path}`;
};

const VisaApplicationDetails = () => {
  const { id } = useParams();
  const api = useApi();
  const goBack = useGoBack();
  const [loading, setLoading] = useState(true);
  const [printing, setPrinting] = useState(false);
  const [activeAction, setActiveAction] = useState("");
  const [application, setApplication] = useState(null);
  const [users, setUsers] = useState([]);
  const [assignmentData, setAssignmentData] = useState(defaultAssignmentData);
  const [adminUpdateData, setAdminUpdateData] = useState(defaultAdminUpdateData);
  const [statusData, setStatusData] = useState(defaultStatusData);
  const [documentReviews, setDocumentReviews] = useState({});

  const syncApplicationState = (data) => {
    setApplication(data);
    setAssignmentData({
      officer_id: data?.assigned_to ? String(data.assigned_to) : "",
      remarks: "Assigned to visa officer",
    });
    setAdminUpdateData({
      assigned_to: data?.assigned_to ? String(data.assigned_to) : "",
      remarks: data?.admin_note ?? "",
    });
    setStatusData({
      status: data?.status ?? "",
      remarks: data?.admin_note ?? "",
    });
    setDocumentReviews(
      (data?.documents ?? []).reduce((acc, document) => {
        acc[document.id] = {
          status: document.verification_status || "pending",
          remarks: document.remarks || "",
        };
        return acc;
      }, {}),
    );
  };

  const loadApplication = async () => {
    setLoading(true);
    const response = await api.getVisaApplicationById(id);
    if (response?.data) {
      syncApplicationState(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadApplication();
  }, [id]);

  useEffect(() => {
    const loadUsers = async () => {
      const response = await api.fetchUsersDropdown();
      if (response?.data) {
        setUsers(response.data);
      }
    };

    loadUsers();
  }, []);

  const handleAssignmentChange = (e) => {
    const { name, value } = e.target;
    setAssignmentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdminUpdateChange = (e) => {
    const { name, value } = e.target;
    setAdminUpdateData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusChange = (e) => {
    const { name, value } = e.target;
    setStatusData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDocumentReviewChange = (documentId, field, value) => {
    setDocumentReviews((prev) => ({
      ...prev,
      [documentId]: {
        ...prev[documentId],
        [field]: value,
      },
    }));
  };

  const refreshApplication = async (message) => {
    await loadApplication();
    if (message) {
      toast.success(message);
    }
  };

  const handleAssign = async () => {
    if (!assignmentData.officer_id) {
      toast.error("Please select an officer");
      return;
    }

    setActiveAction("assign");
    const response = await api.assignVisaApplication({
      visa_application_id: parseInt(id, 10),
      officer_id: parseInt(assignmentData.officer_id, 10),
      remarks: assignmentData.remarks.trim(),
    });
    setActiveAction("");

    if (response?.data) {
      await refreshApplication(VISA_APPLICATIONS_TEXT.success.assign);
    }
  };

  const handleAdminUpdate = async () => {
    if (!adminUpdateData.assigned_to) {
      toast.error("Please select an officer");
      return;
    }

    setActiveAction("update");
    const response = await api.updateVisaApplication(id, {
      assigned_to: parseInt(adminUpdateData.assigned_to, 10),
      remarks: adminUpdateData.remarks.trim(),
    });
    setActiveAction("");

    if (response?.data) {
      await refreshApplication(VISA_APPLICATIONS_TEXT.success.adminUpdate);
    }
  };

  const handleStatusUpdate = async () => {
    if (!statusData.status) {
      toast.error("Please select a status");
      return;
    }

    setActiveAction("status");
    const response = await api.updateVisaApplicationStatus({
      visa_application_id: parseInt(id, 10),
      status: statusData.status,
      remarks: statusData.remarks.trim(),
    });
    setActiveAction("");

    if (response?.data) {
      await refreshApplication(VISA_APPLICATIONS_TEXT.success.status);
    }
  };

  const handleVerifyDocument = async (documentId) => {
    const review = documentReviews[documentId];
    setActiveAction(`document-${documentId}`);
    const response = await api.verifyVisaDocument({
      visa_document_id: documentId,
      status: review?.status || "pending",
      remarks: review?.remarks?.trim() || "",
    });
    setActiveAction("");

    if (response?.data) {
      await refreshApplication(VISA_APPLICATIONS_TEXT.success.document);
    }
  };

  const handlePrint = async () => {
    setPrinting(true);
    const blob = await api.printVisaApplication(id);
    setPrinting(false);

    if (blob) {
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank", "noopener,noreferrer");
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    }
  };

  if (loading || !application) {
    return <Loading />;
  }

  return (
    <AdminLayout>
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col"></div>
            </div>
          </div>
        </div>
        <div className="page-body">
          <div className="container-xl">
            <div className="row row-cards">
              <div className="col-12">
                <div className="card">
                  <VisaApplicationDetailsHeader
                    application={application}
                    onBack={goBack}
                    onPrint={handlePrint}
                    isPrinting={printing}
                  />
                </div>
              </div>

              <div className="col-12">
                <VisaApplicationOverview application={application} />
              </div>

              <div className="col-12">
                <VisaApplicationActions
                  users={users}
                  assignmentData={assignmentData}
                  adminUpdateData={adminUpdateData}
                  statusData={statusData}
                  onAssignmentChange={handleAssignmentChange}
                  onAdminUpdateChange={handleAdminUpdateChange}
                  onStatusChange={handleStatusChange}
                  onAssign={handleAssign}
                  onAdminUpdate={handleAdminUpdate}
                  onStatusUpdate={handleStatusUpdate}
                  activeAction={activeAction}
                />
              </div>

              <div className="col-12">
                <VisaApplicationDocuments
                  documents={application.documents ?? []}
                  documentReviews={documentReviews}
                  onDocumentReviewChange={handleDocumentReviewChange}
                  onVerifyDocument={handleVerifyDocument}
                  getFileUrl={getResourceUrl}
                  activeAction={activeAction}
                />
              </div>

              <div className="col-lg-7">
                <VisaApplicationStatusLogs
                  statusLogs={application.status_logs ?? []}
                />
              </div>

              <div className="col-lg-5">
                <VisaApplicationPayments payments={application.payments ?? []} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default VisaApplicationDetails;
