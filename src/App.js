import React, { useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link,
} from 'react-router-dom'
import * as d3 from 'd3'
import VisitOutpatient from './components/visitOutpatient'
import VisitInpatient from './components/visitInpatient'
import ChildrenView from './components/ChildrenView'
import VisitOutpatientCOPY from './components/visitOutpatient copy'
import {
    HeaderWrap,
    HeaderButton,
    BackgroundAll,
} from './components/style/backgraound'
import { backgrounds } from 'polished'
import './App.css'

const App = () => {
    const [currPage, setCurrPage] = useState('Visits')
    const [thisPage, setThisPage] = useState({
        Visits: true,
        Conditions: false,
        Procedures: false,
    })
    const [visitLoaded, setVisitLoaded] = useState(true)
    const [conditionLoaded, setConditionLoaded] = useState(false)
    const [procedureLoaded, setProcedureLoaded] = useState(false)

    const onClickPage = (e) => {
        setCurrPage(e.target.innerText)
        if (e.target.innerText === 'Out-Visits') {
            setVisitLoaded(true)
            setConditionLoaded(false)
            setProcedureLoaded(false)
        }
        if (e.target.innerText === 'In-Visits') {
            setVisitLoaded(false)
            setConditionLoaded(true)
            setProcedureLoaded(false)
        }
        if (e.target.innerText === 'Children') {
            setVisitLoaded(false)
            setConditionLoaded(false)
            setProcedureLoaded(true)
        }
    }
    // console.log('currPage: ??', currPage, 'setThisPage?', setThisPage)
    return (
        <BackgroundAll>
            <div className="App">
                <Router>
                    <HeaderWrap>
                        <Link to="/visitOut" style={{ textDecoration: 'none' }}>
                            <h1>SNUH DATA HIVE</h1>
                        </Link>

                        {/* <div className="pageButtons">
                         
                                <HeaderButton
                                    onClick={onClickPage}
                                    currColor={(e) =>
                                        e.children === currPage
                                            ? '#6b6b83'
                                            : 'white'
                                    }
                                    selstat={visitLoaded}
                                >
                                    <div
                                        className={
                                            visitLoaded ? 'selected' : ''
                                        }
                                    >
                                        Out-Visits
                                    </div>
                                </HeaderButton>
                         
                            <Link to="/visitIn">
                                <HeaderButton
                                    onClick={onClickPage}
                                    currColor={(e) =>
                                        e.children === currPage
                                            ? '#6b6b83'
                                            : 'white'
                                    }
                                    selstat={conditionLoaded}
                                >
                                    <div
                                        className={
                                            conditionLoaded ? 'selected' : ''
                                        }
                                    >
                                        In-Visits
                                    </div>
                                </HeaderButton>
                            </Link>

                            <Link to="/childrenView">
                                <HeaderButton
                                    onClick={onClickPage}
                                    currColor={(e) =>
                                        e.children === currPage
                                            ? '#6b6b83'
                                            : 'white'
                                    }
                                    selstat={procedureLoaded}
                                >
                                    <div
                                        className={
                                            procedureLoaded ? 'selected' : ''
                                        }
                                    >
                                        Children
                                    </div>
                                </HeaderButton>
                            </Link>
                        </div> */}
                    </HeaderWrap>

                    <Route exact path="/" component={VisitOutpatient} />
                    <Route exact path="/visitOut" component={VisitOutpatient} />
                    <Route
                        exact
                        path="/visitIn"
                        component={VisitOutpatientCOPY}
                    />
                    <Route
                        exact
                        path="/childrenView"
                        component={ChildrenView}
                    />
                </Router>
            </div>
        </BackgroundAll>
    )
}

export default App
