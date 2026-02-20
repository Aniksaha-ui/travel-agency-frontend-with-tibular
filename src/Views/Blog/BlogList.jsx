import { useEffect, useState } from "react";
import Loading from "../../Utils/Components/Loading";
import useApi from "../../Hooks/useApi";
import AdminLayout from "../../Layout/AdminLayout";
import { PaginationFooter } from "../../Utils/Components/PaginationFooter";
import fetchData from "../../Utils/Functions/fetchInformation";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function BlogList() {
    const [page, setPage] = useState(1);
    const [paginationInformation, setPaginationInformation] = useState({
        to: 0,
        from: 0,
        total: 0,
        last_page: 1,
    });
    const [lastPage, setLastPage] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const api = useApi();

    useEffect(() => {
        if (search !== "") {
            setPage(1);
        }
        fetchData(
            api.fetchBlogs,
            page,
            setLastPage,
            setBlogs,
            search,
            setPaginationInformation,
            setLoading
        );
    }, [page, search]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            const response = await api.deleteBlog(id);
            if (response && response.isExecute === 'SUCCESS') {
                toast.success("Blog Deleted Successfully");
                fetchData(
                    api.fetchBlogs,
                    page,
                    setLastPage,
                    setBlogs,
                    search,
                    setPaginationInformation,
                    setLoading
                );
            } else {
                toast.error(response?.message || "Failed to delete blog");
            }
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <AdminLayout>
            <div className="page-wrapper">
                <div className="page-header d-print-none">
                    <div className="container-xl">
                        <div className="row g-2 align-items-center">
                            <div className="col">
                                <h2 className="page-title">Blog Management</h2>
                                <div className="text-muted mt-1">Create and manage your blog posts</div>
                            </div>
                            <div className="col-auto ms-auto d-print-none">
                                <Link to="/admin/blog/add" className="btn btn-primary d-none d-sm-inline-block">
                                    <i className="fa fa-plus me-2"></i>
                                    Create New Blog
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="page-body">
                    <div className="container-xl">
                        <div className="card">
                            <div className="card-body border-bottom py-3">
                                <div className="d-flex">
                                    <div className="text-muted">
                                        Show
                                        <div className="mx-2 d-inline-block">
                                            <input type="text" className="form-control form-control-sm" value={blogs.length} disabled size="3" />
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
                                                placeholder="Search blogs..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="table-responsive">
                                <table className="table table-vcenter table-mobile-md card-table">
                                    <thead>
                                        <tr>
                                            <th>Cover</th>
                                            <th>Title</th>
                                            <th>Author</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th className="w-1">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {blogs.length > 0 ? (
                                            blogs.map((blog, index) => (
                                                <tr key={blog.id || index}>
                                                    <td data-label="Cover">
                                                        {blog.coverImage ? (
                                                            <div className="avatar avatar-md" style={{ backgroundImage: `url(${blog.coverImage})` }}></div>
                                                        ) : (
                                                            <div className="avatar avatar-md">?</div>
                                                        )}
                                                    </td>
                                                    <td data-label="Title">
                                                        <div className="font-weight-medium">{blog.title}</div>
                                                        <div className="text-muted small">{blog.slug}</div>
                                                    </td>
                                                    <td data-label="Author" className="text-muted">
                                                        {blog.author}
                                                    </td>
                                                    <td data-label="Date" className="text-muted">
                                                        {blog.publishDate}
                                                    </td>
                                                    <td data-label="Status">
                                                        <span className={`badge ${blog.status === 'published' ? 'bg-success' : blog.status === 'draft' ? 'bg-warning' : 'bg-secondary'}-lt`}>
                                                            {blog.status}
                                                        </span>
                                                    </td>
                                                    <td className="text-end" data-label="Actions">
                                                        <div className="btn-list flex-nowrap">
                                                            <Link to={`/admin/blog/update/${blog.id}`} className="btn btn-white btn-sm">
                                                                Edit
                                                            </Link>
                                                            <button onClick={() => handleDelete(blog.id)} className="btn btn-danger btn-sm">
                                                                Delete
                                                                <i className="fa fa-trash ms-1"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center py-5">
                                                    <div className="empty">
                                                        <p className="empty-title">No blogs found</p>
                                                        <p className="empty-subtitle text-muted">
                                                            Add your first blog post to get started!
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

export default BlogList;
