import { VISA_REQUIREMENTS_TEXT } from "../text";

const VisaRequirementsTable = ({
  visaRequirements,
  paginationInformation,
  onEdit,
}) => {
  return (
    <div className="table-responsive mx-2 mt-1">
      <table className="table table-bordered mobile-card-table">
        <thead>
          <tr>
            <th>{VISA_REQUIREMENTS_TEXT.tableHeaders.serial}</th>
            <th>{VISA_REQUIREMENTS_TEXT.tableHeaders.country}</th>
            <th>{VISA_REQUIREMENTS_TEXT.tableHeaders.visaType}</th>
            <th>{VISA_REQUIREMENTS_TEXT.tableHeaders.documentName}</th>
            <th>{VISA_REQUIREMENTS_TEXT.tableHeaders.instructions}</th>
            <th>{VISA_REQUIREMENTS_TEXT.tableHeaders.required}</th>
            <th>{VISA_REQUIREMENTS_TEXT.tableHeaders.allowMultiple}</th>
            <th>{VISA_REQUIREMENTS_TEXT.tableHeaders.sortOrder}</th>
            <th>{VISA_REQUIREMENTS_TEXT.tableHeaders.action}</th>
          </tr>
        </thead>
        <tbody>
          {visaRequirements.map((requirement, index) => (
            <tr key={requirement.id}>
              <td data-label={VISA_REQUIREMENTS_TEXT.tableHeaders.serial}>
                {(paginationInformation.from || 0) + index + 1}
              </td>
              <td data-label={VISA_REQUIREMENTS_TEXT.tableHeaders.country}>
                {requirement.country_name}
              </td>
              <td data-label={VISA_REQUIREMENTS_TEXT.tableHeaders.visaType}>
                {requirement.visa_name || requirement.visa_title}
              </td>
              <td
                className="mobile-title"
                data-label={VISA_REQUIREMENTS_TEXT.tableHeaders.documentName}
              >
                {requirement.document_name}
              </td>
              <td data-label={VISA_REQUIREMENTS_TEXT.tableHeaders.instructions}>
                {requirement.instructions ||
                  VISA_REQUIREMENTS_TEXT.fallback.instructions}
              </td>
              <td data-label={VISA_REQUIREMENTS_TEXT.tableHeaders.required}>
                <span
                  className={`badge ${
                    requirement.is_required ? "bg-success" : "bg-danger"
                  }`}
                >
                  {requirement.is_required
                    ? VISA_REQUIREMENTS_TEXT.badges.yes
                    : VISA_REQUIREMENTS_TEXT.badges.no}
                </span>
              </td>
              <td
                data-label={VISA_REQUIREMENTS_TEXT.tableHeaders.allowMultiple}
              >
                <span
                  className={`badge ${
                    requirement.allow_multiple ? "bg-info" : "bg-secondary"
                  }`}
                >
                  {requirement.allow_multiple
                    ? VISA_REQUIREMENTS_TEXT.badges.yes
                    : VISA_REQUIREMENTS_TEXT.badges.no}
                </span>
              </td>
              <td data-label={VISA_REQUIREMENTS_TEXT.tableHeaders.sortOrder}>
                {requirement.sort_order}
              </td>
              <td data-label={VISA_REQUIREMENTS_TEXT.tableHeaders.action}>
                <button
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title={VISA_REQUIREMENTS_TEXT.editButtonTitle}
                  className="btn btn-sm btn-success me-2"
                  onClick={() => onEdit(requirement.id)}
                >
                  <i className="fas fa-edit"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VisaRequirementsTable;
