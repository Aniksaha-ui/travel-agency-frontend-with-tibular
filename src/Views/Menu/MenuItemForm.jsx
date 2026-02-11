import { useEffect, useState } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import useApi from "../../Hooks/useApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { ROLES } from "../../Utils/Constants/common";

const MenuItemForm = ({ action }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const api = useApi();
    const [formData, setFormData] = useState({
        title: "",
        path: "",
        icon: "",
        location: "sidebar",
        order: 0,
        roles: ["admin"],
    });

    useEffect(() => {
        if (action === "update" && id) {
            const fetchItem = async () => {
                try {
                    const response = await api.getMenuItemById(id);
                    if (response) {
                        const data = response.data || response;
                        setFormData({
                            title: data.title || "",
                            path: data.path || "",
                            icon: data.icon || "",
                            location: data.location || "sidebar",
                            order: data.order || 0,
                            roles: Array.isArray(data.roles) ? data.roles : (data.roles ? [data.roles] : [])
                        });
                    }
                } catch (error) {
                    console.error(error);
                    toast.error("Failed to fetch menu item details");
                }
            };
            fetchItem();
        }
    }, [action, id]);

    const handleChange = (e) => {
        const { name, value, type, selectedOptions } = e.target;

        if (name === "roles") {
            const values = Array.from(selectedOptions, option => option.value);
            setFormData({
                ...formData,
                [name]: values,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare data
        const payload = {
            ...formData,
            order: parseInt(formData.order) || 0,
            roles: formData.roles // Already array
        };

        let response;
        try {
            if (action === "add") {
                response = await api.addMenuItem(payload);
            } else {
                response = await api.updateMenuItem(id, payload);
            }

            if (response) {
                toast(`Menu Item ${action === "add" ? "Created" : "Updated"} Successfully`);
                navigate("/admin/menu-items");
            }
        } catch (error) {
            console.error(error);
            toast.error("Operation failed");
        }
    };

    return (
        <AdminLayout>
            <div className="page-wrapper">
                <div className="page-header d-print-none">
                    <div className="container-xl">
                        <div className="row g-2 align-items-center">
                            <div className="col">
                                <h2 className="page-title">{action === "add" ? "Create Menu Item" : "Update Menu Item"}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="page-body">
                    <div className="container-xl">
                        <div className="row row-cards">
                            <div className="col-md-12">
                                <form className="card" onSubmit={handleSubmit}>
                                    <div className="card-header">
                                        <h3 className="card-title">Menu Item Details</h3>
                                    </div>
                                    <div className="card-body">

                                        <div className="mb-3 row">
                                            <label className="col-3 col-form-label required">Title</label>
                                            <div className="col">
                                                <input
                                                    name="title"
                                                    type="text"
                                                    value={formData.title}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="e.g. Settings"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <label className="col-3 col-form-label required">Path</label>
                                            <div className="col">
                                                <input
                                                    name="path"
                                                    type="text"
                                                    value={formData.path}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="e.g. /admin/settings"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <label className="col-3 col-form-label required">Icon</label>
                                            <div className="col">
                                                <input
                                                    name="icon"
                                                    type="text"
                                                    value={formData.icon}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="e.g. SettingsIcon"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <label className="col-3 col-form-label required">Location</label>
                                            <div className="col">
                                                <input
                                                    name="location"
                                                    type="text"
                                                    value={formData.location}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="e.g. sidebar"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <label className="col-3 col-form-label required">Order</label>
                                            <div className="col">
                                                <input
                                                    name="order"
                                                    type="number"
                                                    value={formData.order}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="e.g. 1"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <label className="col-3 col-form-label required">Roles</label>
                                            <div className="col">
                                                <select
                                                    name="roles"
                                                    multiple
                                                    value={formData.roles}
                                                    onChange={handleChange}
                                                    className="form-select"
                                                    required
                                                >
                                                    {ROLES.map((role, index) => (
                                                        <option key={index} value={role}>{role}</option>
                                                    ))}
                                                </select>
                                                <small className="form-hint">Hold Ctrl/Cmd to select multiple roles.</small>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="card-footer text-end">
                                        <button type="submit" className="btn btn-primary">
                                            {action === "add" ? "Create" : "Update"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default MenuItemForm;
