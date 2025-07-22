import { useEffect, useState } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import useApi from "../../Hooks/useApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useGoBack from "../../Hooks/useGoBack";

const HotelForm = ({ action }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const api = useApi();
  const goBack = useGoBack();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    country: "",
    website: "",
    description: "",
    location: "",
    star_rating: 0,
    facilities: "",
    photos: [],
    rooms: [],
  });

  useEffect(() => {
    if (action === "update" && id) {
      api.getHotelById(id).then((res) => {
        setFormData(res.hotel);
      });
    }
  }, [action, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "photos") {
      setFormData({
        ...formData,
        photos: value.split(",").map((url) => url.trim()),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleRoomChange = (index, field, value) => {
    const updatedRooms = [...formData.rooms];
    updatedRooms[index][field] = value;
    setFormData({
      ...formData,
      rooms: updatedRooms,
    });
  };

  const handleSeasonPriceChange = (roomIndex, priceIndex, field, value) => {
    const updatedRooms = [...formData.rooms];
    updatedRooms[roomIndex].prices[priceIndex][field] = value;
    setFormData({ ...formData, rooms: updatedRooms });
  };

  const addRoom = () => {
    setFormData({
      ...formData,
      rooms: [
        ...formData.rooms,
        {
          type_name: "",
          room_size: "",
          max_occupancy: 1,
          total_rooms: 1,
          amenities: "",
          prices: [
            {
              season_start: "",
              season_end: "",
              price_per_night: 0,
            },
          ],
        },
      ],
    });
  };

  const removeRoom = (index) => {
    const updatedRooms = formData.rooms.filter((_, i) => i !== index);
    setFormData({ ...formData, rooms: updatedRooms });
  };

  const addPriceToRoom = (index) => {
    const updatedRooms = [...formData.rooms];
    updatedRooms[index].prices.push({
      season_start: "",
      season_end: "",
      price_per_night: 0,
    });
    setFormData({ ...formData, rooms: updatedRooms });
  };

  const removePriceFromRoom = (roomIndex, priceIndex) => {
    const updatedRooms = [...formData.rooms];
    updatedRooms[roomIndex].prices.splice(priceIndex, 1);
    setFormData({ ...formData, rooms: updatedRooms });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "photos") {
        value.forEach((photo, i) => payload.append(`photos[${i}]`, photo));
      } else if (key === "rooms") {
        value.forEach((room, i) => {
          Object.entries(room).forEach(([roomKey, roomValue]) => {
            if (roomKey === "prices") {
              roomValue.forEach((price, j) => {
                Object.entries(price).forEach(([priceKey, priceValue]) => {
                  payload.append(
                    `rooms[${i}][prices][${j}][${priceKey}]`,
                    priceValue
                  );
                });
              });
            } else {
              payload.append(`rooms[${i}][${roomKey}]`, roomValue);
            }
          });
        });
      } else {
        payload.append(key, value);
      }
    });

    const res =
      action === "add"
        ? await api.addHotel(payload)
        : await api.updateHotel(id, payload);

    if (res) {
      toast.success(
        `${action === "add" ? "Added" : "Updated"} Hotel Successfully`
      );
      navigate("/admin/hotel");
    }
  };

  return (
    <AdminLayout>
      <div className="page-wrapper">
        <div className="page-body">
          <div className="container-xl">
            <div className="row row-cards">
              <div className="col-12">
                <div className="card">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h3>{action === "add" ? "Add Hotel" : "Edit Hotel"}</h3>
                    <button
                      onClick={goBack}
                      className="btn btn-primary d-flex align-items-center"
                    >
                      Back
                    </button>
                  </div>

                  <div className=" d-flex justify-content-between"></div>

                  <form onSubmit={handleSubmit} className="card p-4">
                    {[
                      { label: "Hotel Name", name: "name" },
                      { label: "Email", name: "email" },
                      { label: "City", name: "city" },
                      { label: "Country", name: "country" },
                      { label: "Website", name: "website" },
                      { label: "Description", name: "description" },
                      { label: "Location", name: "location" },
                      {
                        label: "Star Rating",
                        name: "star_rating",
                        type: "number",
                      },
                      { label: "Facilities", name: "facilities" },
                      {
                        label: "Photos (comma-separated URLs)",
                        name: "photos",
                      },
                    ].map(({ label, name, type = "text" }) => (
                      <div className="mb-3" key={name}>
                        <label className="form-label">{label}</label>
                        <input
                          name={name}
                          type={type}
                          className="form-control"
                          value={
                            name === "photos"
                              ? formData.photos.join(", ")
                              : formData[name]
                          }
                          onChange={handleChange}
                        />
                      </div>
                    ))}

                    <hr />
                    <h4>Rooms</h4>
                    {formData.rooms.map((room, index) => (
                      <div key={index} className="border p-3 mb-3 rounded">
                        {[
                          { label: "Room Type", name: "type_name" },
                          { label: "Room Size", name: "room_size" },
                          {
                            label: "Max Occupancy",
                            name: "max_occupancy",
                            type: "number",
                          },
                          {
                            label: "Total Rooms",
                            name: "total_rooms",
                            type: "number",
                          },
                          { label: "Amenities", name: "amenities" },
                        ].map(({ label, name, type = "text" }) => (
                          <div className="mb-2" key={name}>
                            <label className="form-label">{label}</label>
                            <input
                              type={type}
                              className="form-control"
                              value={room[name]}
                              onChange={(e) =>
                                handleRoomChange(index, name, e.target.value)
                              }
                            />
                          </div>
                        ))}
                        <div>
                          <h6>Prices</h6>
                          {room.prices.map((price, priceIndex) => (
                            <div key={priceIndex} className="row mb-2">
                              <div className="col">
                                <input
                                  type="date"
                                  className="form-control"
                                  value={price.season_start}
                                  onChange={(e) =>
                                    handleSeasonPriceChange(
                                      index,
                                      priceIndex,
                                      "season_start",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Season Start"
                                />
                              </div>
                              <div className="col">
                                <input
                                  type="date"
                                  className="form-control"
                                  value={price.season_end}
                                  onChange={(e) =>
                                    handleSeasonPriceChange(
                                      index,
                                      priceIndex,
                                      "season_end",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Season End"
                                />
                              </div>
                              <div className="col">
                                <input
                                  type="number"
                                  className="form-control"
                                  value={price.price_per_night}
                                  onChange={(e) =>
                                    handleSeasonPriceChange(
                                      index,
                                      priceIndex,
                                      "price_per_night",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Price/Night"
                                />
                              </div>
                              <div className="col-auto">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-danger"
                                  onClick={() =>
                                    removePriceFromRoom(index, priceIndex)
                                  }
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                          ))}
                          <button
                            type="button"
                            className="btn btn-sm btn-secondary"
                            onClick={() => addPriceToRoom(index)}
                          >
                            + Add Price
                          </button>
                        </div>
                        <div className="text-end mt-2">
                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            onClick={() => removeRoom(index)}
                          >
                            Remove Room
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={addRoom}
                    >
                      + Add Room
                    </button>
                    <hr />
                    <button type="submit" className="btn btn-primary">
                      {action === "add" ? "Submit" : "Update"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default HotelForm;
