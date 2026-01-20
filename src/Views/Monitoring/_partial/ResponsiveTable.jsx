const ResponsiveTable = ({ title, children }) => (
  <div className="card mt-4">
    <div className="card-header">
      <h4 className="card-title">{title}</h4>
    </div>
    <div className="table-responsive responsive-table">{children}</div>
  </div>
);

export default ResponsiveTable;
