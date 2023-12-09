import React, { useEffect, useState, useRef, useCallback } from "react";
import { Navigate } from "react-big-calendar";
import moment from "moment";
import "moment-timezone";
moment.tz.setDefault("America/New_York");

const CustomToolbar = (props) => {
  const { date, view, views, label, onView, onNavigate, localizer } = props;

  // Default calendar setting
  // Set default view to weekly view
  // Set default date to today
  const setDefaultCalendarSetting = () => {
    const today = new Date();
    sessionStorage.setItem("_view", "week");
    sessionStorage.setItem("_date", today);
  };

  // Whenver calendar reloads, set the current view/date to session storage value
  // If there
  useEffect(() => {
    if (sessionStorage.getItem("_view") && sessionStorage.getItem("_date")) {
      const _view = sessionStorage.getItem("_view");
      const _date = sessionStorage.getItem("_date");
      onView(_view);
      onNavigate(Navigate.DATE, _date);
    } else {
      setDefaultCalendarSetting();
    }
  }, []);

  const updateView = (view) => {
    sessionStorage.setItem("_view", view);
    onView(view);
  };

  const updateDate = (dayReference) => {
    let currentDate = date;
    if (dayReference === "TODAY") {
      currentDate = new Date();
    }
    if (dayReference === "PREV") {
      if (view === "agenda") {
        currentDate = moment(currentDate).subtract(30, "day").toDate();
      } else {
        currentDate = moment(currentDate).subtract(1, view).toDate();
      }
    }
    if (dayReference === "NEXT") {
      if (view === "agenda") {
        currentDate = moment(currentDate).add(30, "day").toDate();
      } else {
        currentDate = moment(currentDate).add(1, view).toDate();
      }
    }

    sessionStorage.setItem("_date", currentDate);
    onNavigate(dayReference);
  };

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={() => updateDate("TODAY")}>
          Today
        </button>
        <button type="button" onClick={() => updateDate("PREV")}>
          Back
        </button>
        <button type="button" onClick={() => updateDate("NEXT")}>
          Next
        </button>
      </span>
      <span className="rbc-toolbar-label">{label}</span>
      <span className="rbc-btn-group">
        <button
          className={view === "month" ? "rbc-active" : ""}
          type="button"
          onClick={() => updateView("month")}
        >
          Month
        </button>
        <button
          className={view === "week" ? "rbc-active" : ""}
          type="button"
          onClick={() => updateView("week")}
        >
          Week
        </button>
        <button
          className={view === "day" ? "rbc-active" : ""}
          type="button"
          onClick={() => updateView("day")}
        >
          Day
        </button>
        <button
          className={view === "agenda" ? "rbc-active" : ""}
          type="button"
          onClick={() => updateView("agenda")}
        >
          Agenda
        </button>
      </span>
    </div>
  );
};

export default CustomToolbar;
