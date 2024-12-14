import Main from "./Pages/Main";
import EventDetailPage from "./Pages/cards/EventDetailPage";
import EventsPage from "./Pages/UpcomingPastevents";
import AddEvent from "./Components/AddEvent";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/event-detail/:id" element={<EventDetailPage />} />
      <Route path="/more-events" element={<EventsPage/>} />
      <Route path="/add-events" element={<AddEvent/>} />
    </Routes>
  </Router>
  );
}

export default App;
