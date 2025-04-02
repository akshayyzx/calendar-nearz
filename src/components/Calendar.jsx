import React, { useState, useEffect, useCallback } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import Modal from "react-modal";
import eventsData from "../utils/eventData";

// Initialize Modal
Modal.setAppElement("#root"); // Make sure to set this to your app's root element

// Setup constants
const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

// All available views
const allViews = [Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA];

// Status definitions with colors and labels
const STATUS_CONFIG = {
  Confirmed: { color: "#4caf50", label: "Confirmed" },
  Pending: { color: "#ff9800", label: "Pending" },
  Completed: { color: "#2196f3", label: "Completed" },
  Cancelled: { color: "#f44336", label: "Cancelled" },
};

const CalendarComponent = () => {
  // State management
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState(Views.WEEK);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
    status: "Confirmed",
    notes: "",
  });
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  // Show notification function
  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Fetch and process events
  useEffect(() => {
    try {
      const mappedEvents = eventsData.map((event) => ({
        id: event.id,
        title: `${event.user.username} - ${event.salon_services[0].service_name}`,
        start: moment(`${event.date} ${event.start_time}`, "YYYY-MM-DD hh:mm a").toDate(),
        end: moment(`${event.date} ${event.end_time}`, "YYYY-MM-DD hh:mm a").toDate(),
        status: event.status,
        notes: event.notes || "",
        clientInfo: event.user,
        service: event.salon_services[0],
      }));
      setEvents(mappedEvents);
    } catch (err) {
      setError("Failed to load calendar events. Please try again.");
      console.error("Error loading events:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Navigation handlers
  const handleNavigate = useCallback((newDate) => {
    setCurrentDate(newDate);
  }, []);

  const handleViewChange = useCallback((newView) => {
    setCurrentView(newView);
  }, []);

  // Event handlers - memoized with useCallback for performance
  const handleOpenModal = useCallback((event = null) => {
    if (event) {
      setSelectedEvent(event);
      setNewEvent({
        title: event.title,
        start: event.start,
        end: event.end,
        status: event.status,
        notes: event.notes || "",
      });
    } else {
      setSelectedEvent(null);
      setNewEvent({
        title: "",
        start: new Date(),
        end: moment().add(1, "hour").toDate(),
        status: "Confirmed",
        notes: "",
      });
    }
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setSelectedEvent(null);
    setNewEvent({
      title: "",
      start: new Date(),
      end: moment().add(1, "hour").toDate(),
      status: "Confirmed",
      notes: "",
    });
  }, []);

  const onSelectSlot = useCallback(({ start }) => {
    handleOpenModal();
    setNewEvent((prev) => ({
      ...prev,
      start,
      end: moment(start).add(1, "hour").toDate(),
    }));
  }, [handleOpenModal]);

  const onSelectEvent = useCallback((event) => {
    handleOpenModal(event);
  }, [handleOpenModal]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  }, []);

  const saveEvent = useCallback(() => {
    // Form validation
    if (!newEvent.title.trim()) {
      showNotification("Event title is required", "error");
      return;
    }

    if (selectedEvent) {
      // Update existing event
      setEvents((prevEvents) =>
        prevEvents.map((e) =>
          e.id === selectedEvent.id ? { ...e, ...newEvent } : e
        )
      );
      showNotification("Event updated successfully");
    } else {
      // Add new event
      setEvents((prevEvents) => [
        ...prevEvents,
        { ...newEvent, id: Date.now() },
      ]);
      showNotification("Event added successfully");
    }
    handleCloseModal();
  }, [newEvent, selectedEvent, handleCloseModal]);

  const deleteEvent = useCallback(() => {
    if (selectedEvent) {
      setEvents((prevEvents) =>
        prevEvents.filter((e) => e.id !== selectedEvent.id)
      );
      showNotification("Event deleted successfully");
      handleCloseModal();
    }
  }, [selectedEvent, handleCloseModal]);

  const moveEvent = useCallback(({ event, start, end }) => {
    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e.id === event.id ? { ...e, start, end } : e
      )
    );
    showNotification("Event moved successfully");
  }, []);

  // Custom toolbar component to ensure navigation works
  const CustomToolbar = ({ date, onNavigate, onView, view }) => {
    return (
      <div className="rbc-toolbar" style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
        <div className="rbc-btn-group">
          <button type="button" onClick={() => onNavigate('TODAY')}>Today</button>
          <button type="button" onClick={() => onNavigate('PREV')}>Back</button>
          <button type="button" onClick={() => onNavigate('NEXT')}>Next</button>
        </div>
        <div className="rbc-toolbar-label">
          {moment(date).format(view === Views.DAY ? 'MMMM D, YYYY' : view === Views.WEEK ? 'MMM D YYYY' : 'MMMM YYYY')}
        </div>
        <div className="rbc-btn-group">
          <button type="button" onClick={() => onView(Views.MONTH)} className={view === Views.MONTH ? 'rbc-active' : ''}>Month</button>
          <button type="button" onClick={() => onView(Views.WEEK)} className={view === Views.WEEK ? 'rbc-active' : ''}>Week</button>
          <button type="button" onClick={() => onView(Views.DAY)} className={view === Views.DAY ? 'rbc-active' : ''}>Day</button>
          <button type="button" onClick={() => onView(Views.AGENDA)} className={view === Views.AGENDA ? 'rbc-active' : ''}>Agenda</button>
        </div>
      </div>
    );
  };

  // Style getters
  const eventStyleGetter = useCallback((event) => ({
    style: {
      backgroundColor: STATUS_CONFIG[event.status]?.color || "#757575",
      color: "white",
      borderRadius: "4px",
      border: "none",
      padding: "2px 5px",
    },
  }), []);

  // Loading and error states
  if (isLoading) return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "64px" }}>Loading calendar...</div>;
  if (error) return <div style={{ color: "#f44336", textAlign: "center", padding: "16px" }}>{error}</div>;

  return (
    <div style={{ backgroundColor: "white", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", padding: "24px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "24px" }}>Appointment Calendar</h2>
      
      <div style={{ height: "80vh", marginBottom: "16px" }}>
        <DragAndDropCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={onSelectSlot}
          onSelectEvent={onSelectEvent}
          onEventDrop={moveEvent}
          onEventResize={moveEvent}
          resizable
          eventPropGetter={eventStyleGetter}
          date={currentDate}
          view={currentView}
          onNavigate={handleNavigate}
          onView={handleViewChange}
          views={allViews}
          step={15}
          timeslots={4}
          style={{ height: "100%", border: "1px solid #e2e8f0", borderRadius: "8px" }}
          popup
          scrollToTime={moment().toDate()}
          components={{
            toolbar: CustomToolbar,
          }}
        />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center", marginTop: "16px" }}>
        {Object.entries(STATUS_CONFIG).map(([status, config]) => (
          <div key={status} style={{ display: "flex", alignItems: "center" }}>
            <div 
              style={{ width: "16px", height: "16px", marginRight: "8px", borderRadius: "50%", backgroundColor: config.color }}
            ></div>
            <span style={{ fontSize: "14px" }}>{config.label}</span>
          </div>
        ))}
      </div>

      {/* Toast Notification */}
      {notification.show && (
        <div 
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "12px 20px",
            backgroundColor: notification.type === "error" ? "#f44336" : "#4caf50",
            color: "white",
            borderRadius: "4px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            zIndex: 9999,
            transition: "all 0.3s ease"
          }}
        >
          {notification.message}
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        onRequestClose={handleCloseModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '24px',
            borderRadius: '8px',
            maxWidth: '500px',
            width: '90%'
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 1000
          }
        }}
      >
        <div>
          <h2 style={{ marginTop: 0, marginBottom: "20px", fontSize: "20px", fontWeight: "bold" }}>
            {selectedEvent ? "Edit Event" : "Create New Event"}
          </h2>
          
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>Title</label>
            <input 
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
              placeholder="Event title"
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>Start Date/Time</label>
              <input 
                type="datetime-local"
                name="start"
                value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
                onChange={(e) => setNewEvent({
                  ...newEvent,
                  start: new Date(e.target.value)
                })}
                style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>End Date/Time</label>
              <input 
                type="datetime-local"
                name="end"
                value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
                onChange={(e) => setNewEvent({
                  ...newEvent,
                  end: new Date(e.target.value)
                })}
                style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>Status</label>
            <select 
              name="status"
              value={newEvent.status}
              onChange={handleInputChange}
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
            >
              {Object.keys(STATUS_CONFIG).map((status) => (
                <option key={status} value={status}>
                  {STATUS_CONFIG[status].label}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>Notes</label>
            <textarea
              name="notes"
              value={newEvent.notes}
              onChange={handleInputChange}
              placeholder="Additional details"
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd", minHeight: "80px" }}
              rows={3}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "24px" }}>
            {selectedEvent && (
              <button 
                onClick={deleteEvent}
                style={{ 
                  padding: "8px 16px", 
                  backgroundColor: "#f44336", 
                  color: "white", 
                  border: "none", 
                  borderRadius: "4px",
                  cursor: "pointer" 
                }}
              >
                Delete
              </button>
            )}
            <div style={{ marginLeft: "auto", display: "flex", gap: "12px" }}>
              <button 
                onClick={handleCloseModal}
                style={{ 
                  padding: "8px 16px", 
                  backgroundColor: "#f5f5f5", 
                  border: "1px solid #ddd", 
                  borderRadius: "4px",
                  cursor: "pointer" 
                }}
              >
                Cancel
              </button>
              <button 
                onClick={saveEvent}
                style={{ 
                  padding: "8px 16px", 
                  backgroundColor: "#2196f3", 
                  color: "white", 
                  border: "none", 
                  borderRadius: "4px",
                  cursor: "pointer" 
                }}
              >
                {selectedEvent ? "Update" : "Add"} Event
              </button>
            </div>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default CalendarComponent;