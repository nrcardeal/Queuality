// eslint-disable-next-line
import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SectionsPage from './queuality/sections/SectionsPage'
import SubjectsPage from './queuality/subjects/SubjectsPage'
import { TicketsControl } from './queuality/tickets/TicketsControlPage'
import { getTicketsService } from './queuality/tickets/TicketsService'
import { getSectionsService } from './queuality/sections/SectionsService'
import { getSubjectsService } from './queuality/subjects/SubjectsService'

export const API_BASE_URL = 'http://localhost:5000/queuality'

function PageRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path='/queuality/sections'>
          <SectionsPage service={getSectionsService()}/>
        </Route>
        <Route exact path='/queuality/sections/:sectionId/subjects'>
          <SubjectsPage service={getSubjectsService()}/>
        </Route>
        <Route exact path='/tickets'>
          <TicketsControl.Page ticketsService = {getTicketsService()}/>
        </Route>
        <Route exact path='/employess'>
          <TicketsControl.Page ticketsService = {getTicketsService()}/>
        </Route>
      </Switch>
    </Router>
  )
}

function App() {
  return (
    <div className="App">
      <PageRouter />
    </div>
  )
}

export default App;
