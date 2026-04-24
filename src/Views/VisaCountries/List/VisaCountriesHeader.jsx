import Search from "../../../Utils/Components/Search";
import { VISA_COUNTRIES_TEXT } from "../text";

const VisaCountriesHeader = ({ search, setSearch, onAddNew }) => {
  return (
    <>
      <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
        <h3 className="card-title">{VISA_COUNTRIES_TEXT.listTitle}</h3>
        <button
          type="button"
          onClick={onAddNew}
          className="btn btn-primary"
        >
          {VISA_COUNTRIES_TEXT.addButton}
        </button>
      </div>
      <div className="card-body">
        <Search search={search} setSearch={setSearch} />
      </div>
    </>
  );
};

export default VisaCountriesHeader;
