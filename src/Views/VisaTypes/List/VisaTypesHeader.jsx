import Search from "../../../Utils/Components/Search";
import { VISA_TYPES_TEXT } from "../text";

const VisaTypesHeader = ({ search, setSearch, onAddNew }) => {
  return (
    <>
      <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
        <h3 className="card-title">{VISA_TYPES_TEXT.listTitle}</h3>
        <button
          type="button"
          onClick={onAddNew}
          className="btn btn-primary"
        >
          {VISA_TYPES_TEXT.addButton}
        </button>
      </div>
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-md-12">
            <Search search={search} setSearch={setSearch} />
          </div>
        </div>
      </div>
    </>
  );
};

export default VisaTypesHeader;
