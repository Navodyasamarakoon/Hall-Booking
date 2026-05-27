const BASE_URL = "http://203.94.72.18/trainee/api";



// ======================================
// LOGIN
// ======================================

async function login() {

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    try {

        const response = await fetch(
            `${BASE_URL}/auth/signin`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username,
                    password
                })
            }
        );

        const data = await response.json();

        console.log(data);

        if (response.ok) {

            localStorage.setItem("token", data.token);

            alert("Login Success");

            window.location.href = "dashboard.html";

        } else {

            alert(data.message || "Login Failed");
        }

    } catch (error) {

        console.log(error);

        alert("Server Error");
    }
}



// ======================================
// LOGOUT
// ======================================

function logout() {

    localStorage.removeItem("token");

    window.location.href = "index.html";
}



// ======================================
// PAGE NAVIGATION
// ======================================

function goToHalls() {

    window.location.href = "halls.html";
}

function goToBooking() {

    window.location.href = "booking.html";
}



// ======================================
// SAVE HALL
// ======================================

async function saveHall() {

    const token = localStorage.getItem("token");

    const hallData = {

        name:
            document.getElementById("hallName").value,

        description:
            document.getElementById("description").value,

        location:
            document.getElementById("location").value,

        capacity: Number(
            document.getElementById("capacity").value
        ),

        hasProjector: true,

        hasAc: true,

        hasWhiteboard: true
    };

    console.log(hallData);

    try {

        const response = await fetch(
            `${BASE_URL}/production/hall/save`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify(hallData)
            }
        );

        const data = await response.json();

        console.log(data);

        if (response.ok) {

            alert("Hall Saved");

            getHalls();

        } else {

            alert(data.message || "Save Failed");
        }

    } catch (error) {

        console.log(error);

        alert("Server Error");
    }
}



// ======================================
// GET ALL HALLS
// ======================================

async function getHalls() {

    const token = localStorage.getItem("token");

    try {

        const response = await fetch(
            `${BASE_URL}/production/hall/get/all/active`,
            {
                method: "GET",

                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        console.log(data);

        let hallHTML = "";

        data.forEach(hall => {

            hallHTML += `

                <div class="card">

                    <h3>${hall.name}</h3>

                    <p>${hall.description}</p>

                    <p>${hall.location}</p>

                    <p>Capacity: ${hall.capacity}</p>

                    <p>ID: ${hall.id}</p>

                </div>

            `;
        });

        document.getElementById("hallList").innerHTML =
            hallHTML;

    } catch (error) {

        console.log(error);

        alert("Server Error");
    }
}



// ======================================
// UPDATE HALL
// ======================================

async function updateHall() {

    const token = localStorage.getItem("token");

    const hallData = {

        id:
            document.getElementById("updateHallId").value,

        name:
            document.getElementById("updateHallName").value,

        description:
            document.getElementById("updateDescription").value,

        location:
            document.getElementById("updateLocation").value,

        capacity: Number(
            document.getElementById("updateCapacity").value
        ),

        hasProjector: true,

        hasAc: true,

        hasWhiteboard: true,

        status: true
    };

    console.log(hallData);

    try {

        const response = await fetch(
            `${BASE_URL}/production/hall/update`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify(hallData)
            }
        );

        const data = await response.json();

        console.log(data);

        if (response.ok) {

            alert("Hall Updated");

            getHalls();

        } else {

            alert(data.message || "Update Failed");
        }

    } catch (error) {

        console.log(error);

        alert("Server Error");
    }
}



// ======================================
// CREATE BOOKING
// ======================================

async function saveBooking() {

    const token = localStorage.getItem("token");

    const bookingData = {

        reservedDate:
            document.getElementById("reservedDate").value,

        startTime:
            document.getElementById("startTime").value,

        endTime:
            document.getElementById("endTime").value,

        bookingFor:
            document.getElementById("bookingFor").value,

        expectedParticipants: Number(
            document.getElementById("participants").value
        ),

        specialRequirements:
            document.getElementById("requirements").value,

        hall: {
            id:
                document.getElementById("hallId").value
        },

        requestedBy: {
            userId:
                document.getElementById("userId").value
        },

        createdAt:
            new Date().toISOString()
    };

    console.log(bookingData);

    try {

        const response = await fetch(
            `${BASE_URL}/production/booking/save`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify(bookingData)
            }
        );

        const data = await response.json();

        console.log(data);

        if (response.ok) {

            alert("Booking Created");

            getBookings();

        } else {

            alert(data.message || "Booking Failed");
        }

    } catch (error) {

        console.log(error);

        alert("Server Error");
    }
}



// ======================================
// GET ALL BOOKINGS
// ======================================

async function getBookings() {

    const token = localStorage.getItem("token");

    try {

        const response = await fetch(
            `${BASE_URL}/production/booking/get/all/bookings`,
            {
                method: "GET",

                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        console.log(data);

        let bookingHTML = "";

        data.forEach(booking => {

            bookingHTML += `

                <div class="card">

                    <h3>${booking.bookingFor}</h3>

                    <p>Date:
                        ${booking.reservedDate}
                    </p>

                    <p>Start:
                        ${booking.startTime}
                    </p>

                    <p>End:
                        ${booking.endTime}
                    </p>

                    <p>Participants:
                        ${booking.expectedParticipants}
                    </p>

                </div>

            `;
        });

        document.getElementById("bookingList").innerHTML =
            bookingHTML;

    } catch (error) {

        console.log(error);

        alert("Server Error");
    }
}