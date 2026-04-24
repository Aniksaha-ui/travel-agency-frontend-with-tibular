import { VISA_COUNTRIES_TEXT } from "../text";

const VisaCountriesTable = ({
  visaCountries,
  paginationInformation,
  onEdit,
}) => {
  return (
    <div className="table-responsive mx-2 mt-1">
      <table className="table table-bordered mobile-card-table">
        <thead>
          <tr>
            <th>{VISA_COUNTRIES_TEXT.tableHeaders.serial}</th>
            <th>{VISA_COUNTRIES_TEXT.tableHeaders.name}</th>
            <th>{VISA_COUNTRIES_TEXT.tableHeaders.isoCode}</th>
            <th>{VISA_COUNTRIES_TEXT.tableHeaders.nationality}</th>
            <th>{VISA_COUNTRIES_TEXT.tableHeaders.displayOrder}</th>
            <th>{VISA_COUNTRIES_TEXT.tableHeaders.status}</th>
            <th>{VISA_COUNTRIES_TEXT.tableHeaders.action}</th>
          </tr>
        </thead>
        <tbody>
          {visaCountries.map((country, index) => (
            <tr key={country.id}>
              <td data-label={VISA_COUNTRIES_TEXT.tableHeaders.serial}>
                {(paginationInformation.from || 0) + index + 1}
              </td>
              <td
                className="mobile-title"
                data-label={VISA_COUNTRIES_TEXT.tableHeaders.name}
              >
                {country.name}
              </td>
              <td data-label={VISA_COUNTRIES_TEXT.tableHeaders.isoCode}>
                {country.iso_code}
              </td>
              <td data-label={VISA_COUNTRIES_TEXT.tableHeaders.nationality}>
                {country.nationality_name}
              </td>
              <td data-label={VISA_COUNTRIES_TEXT.tableHeaders.displayOrder}>
                {country.display_order}
              </td>
              <td data-label={VISA_COUNTRIES_TEXT.tableHeaders.status}>
                <span
                  className={`badge ${
                    country.is_active ? "bg-success" : "bg-danger"
                  }`}
                >
                  {country.is_active
                    ? VISA_COUNTRIES_TEXT.status.active
                    : VISA_COUNTRIES_TEXT.status.inactive}
                </span>
              </td>
              <td data-label={VISA_COUNTRIES_TEXT.tableHeaders.action}>
                <button
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title={VISA_COUNTRIES_TEXT.editButtonTitle}
                  className="btn btn-sm btn-success me-2"
                  onClick={() => onEdit(country.id)}
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

export default VisaCountriesTable;
