import { VISA_TYPES_TEXT } from "../text";

const VisaTypesTable = ({ visaTypes, paginationInformation, onEdit }) => {
  return (
    <div className="table-responsive mx-2 mt-1">
      <table className="table table-bordered mobile-card-table">
        <thead>
          <tr>
            <th>{VISA_TYPES_TEXT.tableHeaders.serial}</th>
            <th>{VISA_TYPES_TEXT.tableHeaders.country}</th>
            <th>{VISA_TYPES_TEXT.tableHeaders.title}</th>
            <th>{VISA_TYPES_TEXT.tableHeaders.visaName}</th>
            <th>{VISA_TYPES_TEXT.tableHeaders.fee}</th>
            <th>{VISA_TYPES_TEXT.tableHeaders.currency}</th>
            <th>{VISA_TYPES_TEXT.tableHeaders.processingDays}</th>
            <th>{VISA_TYPES_TEXT.tableHeaders.entryType}</th>
            <th>{VISA_TYPES_TEXT.tableHeaders.status}</th>
            <th>{VISA_TYPES_TEXT.tableHeaders.action}</th>
          </tr>
        </thead>
        <tbody>
          {visaTypes.map((visaType, index) => (
            <tr key={visaType.id}>
              <td data-label={VISA_TYPES_TEXT.tableHeaders.serial}>
                {(paginationInformation.from || 0) + index + 1}
              </td>
              <td data-label={VISA_TYPES_TEXT.tableHeaders.country}>
                {visaType.country_name}
              </td>
              <td data-label={VISA_TYPES_TEXT.tableHeaders.title}>
                {visaType.title}
              </td>
              <td
                className="mobile-title"
                data-label={VISA_TYPES_TEXT.tableHeaders.visaName}
              >
                {visaType.visa_name}
              </td>
              <td data-label={VISA_TYPES_TEXT.tableHeaders.fee}>
                {visaType.fee}
              </td>
              <td data-label={VISA_TYPES_TEXT.tableHeaders.currency}>
                {visaType.currency}
              </td>
              <td data-label={VISA_TYPES_TEXT.tableHeaders.processingDays}>
                {visaType.processing_days}
              </td>
              <td data-label={VISA_TYPES_TEXT.tableHeaders.entryType}>
                {visaType.entry_type}
              </td>
              <td data-label={VISA_TYPES_TEXT.tableHeaders.status}>
                <span
                  className={`badge ${
                    visaType.status == "1" ? "bg-success" : "bg-danger"
                  }`}
                >
                  {visaType.status == "1"
                    ? VISA_TYPES_TEXT.status.active
                    : VISA_TYPES_TEXT.status.inactive}
                </span>
              </td>
              <td data-label={VISA_TYPES_TEXT.tableHeaders.action}>
                <button
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title={VISA_TYPES_TEXT.editButtonTitle}
                  className="btn btn-sm btn-success me-2"
                  onClick={() => onEdit(visaType.id)}
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

export default VisaTypesTable;
