import ResponsiveTable from "../../Monitoring/_partial/ResponsiveTable";

export const PackageSummaryList = ({ packageSummaryInfo }) => {
  return (
    <ResponsiveTable title="Package-wise Booking Summary">
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
          {packageSummaryInfo?.map((pack) => {
            const totalAdult = Number(pack.total_adult) || 0;
            const totalChild = Number(pack.total_child) || 0;
            const totalPeople = totalAdult + totalChild;

            const adultPercent = totalPeople
              ? Math.round((totalAdult / totalPeople) * 100)
              : 0;
            const childPercent = totalPeople
              ? 100 - adultPercent
              : 0;

            return (
              <tr key={pack.package_id}>
                <td>{pack.package_id}</td>
                <td>{pack.package_name}</td>
                <td>{pack.number_of_bookings}</td>
                <td>{totalAdult} ({adultPercent}%)</td>
                <td>{totalChild} ({childPercent}%)</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </ResponsiveTable>
  );
};
