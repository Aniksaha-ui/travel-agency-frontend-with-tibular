import ResponsiveTable from "../../Monitoring/_partial/ResponsiveTable";

export const PackageSummaryList = ({ packageSummaryInfo }) => {
  return (
    <ResponsiveTable title="Latest SQL Logs">
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Package Id</th>
            <th>Package Name</th>
            <th>#Number of Booking</th>
            <th>Adult</th>
            <th>Child</th>
          </tr>
        </thead>
        <tbody>
          {packageSummaryInfo?.map((pack) => (
            <tr
              key={pack.id}
              className=""
            >
              <td>{pack.package_id}</td>
              <td>{pack.package_name}</td>
              <td>{pack.number_of_bookings}</td>
              <td>{pack.total_adult}</td>
              <td>{pack.total_child}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ResponsiveTable>
  );
};
