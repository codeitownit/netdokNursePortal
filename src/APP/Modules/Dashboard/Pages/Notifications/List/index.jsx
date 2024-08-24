import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth"; // Import Firebase Authentication
import { collection, where, onSnapshot, query, getDocs, addDoc, doc, updateDoc } from "firebase/firestore"; // Import Firestore
import { auth, db } from "../../../../../../../firebaseConfig";
import Header from "./header";
import NotificationItem from "./NotificationItem";
import data from "./data";
import { getCurrentDate } from "../../../../../Components/globals";
import useaxios from "../../../../../Hooks/useAxios";
import GlobalTopBar from "../../../../../Components/TopBars/GlobalTopBar";
// import { differenceInDays, parseISO, isSameDay } from "date-fns";
import { useNavigate } from "react-router-dom";



const ListNotifications = () => {
  const [notifications, setNotifications] = useState(data);
  const [journal, setJournal] = useState([])
  const [unreadCount, setUnreadCount] = useState(null)
  const request = useaxios()
  const navigate = useNavigate()
  const nurseId = localStorage.getItem("primeDoctorUserId")

  useEffect(() => {
    readNotifications();
  }, []);
  const fetchData = async () => {
    try {
      const res = await request({
        method: "GET",
        url: "patientJournal",
        body: {},
        auth: false,
      });

      // Check if the response is not an error
      if (res !== "error") {
        console.log(res?.data);
        // console.log(user.lastName)
        setJournal(res?.data || []);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if(journal){
    console.log(journal)
    const currentDate = getCurrentDate()
    console.log(currentDate)
    journal.map((item)=>{
      if(item?.admStatus === "admitted" && item?.admissionDate === currentDate && item?.nurse===nurseId){
        console.log(item)
        const existData = `A new patient ${item.patientName} has been added`
        const newData = {
            date: getCurrentDate(),
            notification: existData,
            unRead: true
        }
        upsertNotification(newData, "docId", nurseId, "date")
      }
    })
}
  }, []);

  function upsertNotification(newFieldData, fieldName, fieldValue, targetValue) {
    const dbref = collection(db, "notifications"); // Correct way to reference a collection
  
    // Create a query to find documents with the specific field value
    const q = query(dbref, where(fieldName, "==", fieldValue));
  
    getDocs(q)
      .then((querySnapshot) => {
        let matchFound = false;
  
        querySnapshot.forEach((doc) => {
          if (doc.data()[targetValue] === newFieldData[targetValue]) {
            matchFound = true;
          }
        });
  
        if (!matchFound) {
          // If no match is found, add a new record
          addDoc(dbref, {
            docId: nurseId,
            ...newFieldData,
          })
            .then(() => {
              console.log("Notification created successfully.");
            })
            .catch((error) => {
              console.error("Error creating notification: ", error);
            });
        } else {
          console.log("Matching notification already exists.");
        }
      })
      .catch((error) => {
        console.error("Error checking notifications: ", error);
      });
  
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
  
  // Function to update the unRead status of a notification
const updateNotificationStatus = async (notificationId) => {
    try {
      const notificationRef = doc(db, "notifications", notificationId); // Reference to the specific document
      await updateDoc(notificationRef, {
        unRead: false, // Update the unRead status to false
      });
      console.log("Notification status updated successfully.");
    } catch (error) {
      console.error("Error updating notification status: ", error);
    }
    navigate("/dashboard")
  };


  const handleNotificationClick = (notificationId, notification) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, unRead: false }
          : notification
      )
    );
    console.log(notification)
    updateNotificationStatus(notificationId);
  };

  const markAllRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        unRead: false,
      }))
    );
  };
  

  const readNotifications = () => {
    onAuthStateChanged(auth, () => {
      // if (user) {

      // Fetching and counting notifications
      const notificationsRef = collection(db, "notifications");
      onSnapshot(notificationsRef, (snapshot) => {
        const filteredNotifications = snapshot.docs.filter(
          (doc) => doc.data().docId === nurseId
        );
        setUnreadCount(filteredNotifications.length)

        const fetchedNotifications = filteredNotifications.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setNotifications(fetchedNotifications);
      });
    });
  };

  // const calculateDateLabel = (notificationDate) => {
  //   const currentDate = new Date();
  //   const parsedNotificationDate = parseISO(notificationDate);

  //   if (isSameDay(parsedNotificationDate, currentDate)) {
  //     return "today";
  //   } else {
  //     const daysDifference = differenceInDays(currentDate, parsedNotificationDate);
  //     return `${daysDifference} day(s) ago`;
  //   }
  // };

  return (
    <article className="grid w-svw max-w-[41.875rem] gap-3 rounded-2xl bg-white px-4 py-6 shadow-lg md:px-6 md:py-2">
      <Header markAllRead={markAllRead} unreadCount={unreadCount} />
      <div id="notification">
        {notifications.map((notification) => (
            // const dateLabel = calculateDateLabel(notification.date);
          <NotificationItem
            key={notification.id}
            {...notification}
            // date={dateLabel}
            onClick={() => handleNotificationClick(notification.id, notification)}
          />
))}
      </div>
    </article>
  );
};

export default ListNotifications;
