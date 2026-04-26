import Search from "../../../Utils/Components/Search";
import { VISA_APPLICATIONS_TEXT } from "../text";

const VisaApplicationsHeader = ({ search, setSearch }) => {
  return (
    <>
      <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
        <h3 className="card-title">{VISA_APPLICATIONS_TEXT.listTitle}</h3>
      </div>
      <div className="card-body">
        <Search search={search} setSearch={setSearch} />
      </div>
    </>
  );
};

export default VisaApplicationsHeader;
