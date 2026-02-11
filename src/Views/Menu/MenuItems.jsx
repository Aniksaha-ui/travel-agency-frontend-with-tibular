import { useEffect, useState } from "react";
import Loading from "../../Utils/Components/Loading";
import useApi from "../../Hooks/useApi";
import AdminLayout from "../../Layout/AdminLayout";
import { PaginationFooter } from "../../Utils/Components/PaginationFooter";
import Search from "../../Utils/Components/Search";
import fetchData from "../../Utils/Functions/fetchInformation";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function MenuItems() {
    const [page, setPage] = useState(1);
    const [paginationInformation, setPaginationInformation] = useState({
        to: 0,
        from: 0,
        total: 0,
        last_page: 1,
    });
    const [lastPage, setLastPage] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("admin"); // 'admin' | 'guide'
    const api = useApi();

    useEffect(() => {
        if (search !== "") {
            setPage(1);
        }
        fetchData(
            api.fetchMenuItems,
            page,
            setLastPage,
            setMenuItems,
            search,
            setPaginationInformation,
            setLoading
        );
    }, [page, search]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this menu item?")) {
            const response = await api.deleteMenuItem(id);
            if (response) {
                toast.success("Menu Item Deleted Successfully");
                fetchData(
                    api.fetchMenuItems,
                    page,
                    setLastPage,
                    setMenuItems,
                    search,
                    setPaginationInformation,
                    setLoading
                );
            }
        }
    };

    // Filter Logic applied to the current page of items
    const filteredItems = (Array.isArray(menuItems) ? menuItems : []).filter(item => {
        // Role Filter based on Active Tab
        const roles = Array.isArray(item.roles) ? item.roles : (typeof item.roles === 'string' ? item.roles.split(',') : []);
        const cleanRoles = roles.map(r => r.trim().toLowerCase());

        if (activeTab === 'admin') {
            return cleanRoles.includes('admin');
        } else {
            return cleanRoles.includes('guide');
        }
    });

    if (loading) {
        return <Loading />;
    }

    return (
        <AdminLayout>
            <div className="page-wrapper">
                {/* Header */}
                <div className="page-header d-print-none">
                    <div className="container-xl">
                        <div className="row g-2 align-items-center">
                            <div className="col">
                                <h2 className="page-title">Menu Management</h2>
                                <div className="text-muted mt-1">Manage application navigation and permissions</div>
                            </div>
                            <div className="col-auto ms-auto d-print-none">
                                <Link to="/admin/menu-items/add" className="btn btn-primary d-none d-sm-inline-block">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                    Create New Item
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="page-body">
                    <div className="container-xl">
                        <div className="card">
                            <div className="card-header">
                                <ul className="nav nav-tabs card-header-tabs">
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${activeTab === 'admin' ? 'active' : ''}`}
                                            onClick={() => setActiveTab('admin')}
                                        >
                                            Admin Menu
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${activeTab === 'guide' ? 'active' : ''}`}
                                            onClick={() => setActiveTab('guide')}
                                        >
                                            Guide Menu
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            <div className="card-body border-bottom py-3">
                                <div className="d-flex">
                                    <div className="text-muted">
                                        Show
                                        <div className="mx-2 d-inline-block">
                                            <input type="text" className="form-control form-control-sm" value={filteredItems.length} disabled size="3" aria-label="Invoices count" />
                                        </div>
                                        entries
                                    </div>
                                    <div className="ms-auto text-muted">
                                        Search:
                                        <div className="ms-2 d-inline-block">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                                aria-label="Search items"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="table-responsive mx-2 mt-1">
                                <table className="table table-bordered mobile-card-table">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Title</th>
                                            <th>Path</th>
                                            <th>Icon</th>
                                            <th>Location</th>
                                            <th>Order</th>
                                            <th>Roles</th>
                                            <th className="text-end">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredItems.length > 0 ? (
                                            filteredItems.map((item, index) => (
                                                <tr key={item.id || index}>
                                                    <td data-label="No."><span className="text-muted">{(paginationInformation.from || 1) + index}</span></td>
                                                    <td className="mobile-title font-weight-medium" data-label="Title">{item.title}</td>
                                                    <td className="text-muted" data-label="Path"><code>{item.path}</code></td>
                                                    <td data-label="Icon">
                                                        <span className="badge bg-blue-lt">{item.icon}</span>
                                                    </td>
                                                    <td data-label="Location">
                                                        <span className={`badge ${item.location === 'sidebar' ? 'bg-green' : 'bg-purple'}-lt`}>
                                                            {item.location}
                                                        </span>
                                                    </td>
                                                    <td data-label="Order">{item.order}</td>
                                                    <td data-label="Roles">
                                                        {(() => {
                                                            const roles = Array.isArray(item.roles) ? item.roles : (typeof item.roles === 'string' ? item.roles.split(',') : []);
                                                            return roles.map((r, i) => (
                                                                <span key={i} className="badge bg-secondary-lt me-1">{r.trim()}</span>
                                                            ));
                                                        })()}
                                                    </td>
                                                    <td className="text-end" data-label="Actions">
                                                        <Link to={`/admin/menu-items/update/${item.id}`} className="btn btn-sm btn-primary me-2">
                                                            Edit
                                                        </Link>
                                                        <button onClick={() => handleDelete(item.id)} className="btn btn-sm btn-danger">
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="8" className="text-center py-5">
                                                    <div className="empty">
                                                        <div className="empty-img">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="128" height="128" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /></svg>
                                                        </div>
                                                        <p className="empty-title">No menu items found</p>
                                                        <p className="empty-subtitle text-muted">
                                                            Try adjusting your search or add a new menu item.
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <PaginationFooter
                                paginationInformation={paginationInformation}
                                lastPage={lastPage}
                                page={page}
                                setPage={setPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default MenuItems;
