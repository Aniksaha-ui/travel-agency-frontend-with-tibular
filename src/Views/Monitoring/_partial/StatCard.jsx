const StatCard = ({ title, value, icon, color = "primary" }) => (
  <div className="col-12 col-sm-6 col-lg-3">
    <div className="card h-100">
      <div className="card-body d-flex align-items-center">
        <span className={`avatar bg-${color} text-white me-3`}>
          <i className={`fa ${icon}`} />
        </span>
        <div>
          <div className="fw-bold">{title}</div>
          <div className="text-muted fs-4">{value ?? "-"}</div>
        </div>
      </div>
    </div>
  </div>
);

export default StatCard;
