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
import { HeaderWrap, HeaderButton } from './components/style/backgraound'

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
        if (e.target.innerText === 'Visits') {
            setVisitLoaded(true)
            setConditionLoaded(false)
            setProcedureLoaded(false)
        }
        if (e.target.innerText === 'Conditions') {
            setVisitLoaded(false)
            setConditionLoaded(true)
            setProcedureLoaded(false)
        }
        if (e.target.innerText === 'Procedures') {
            setVisitLoaded(false)
            setConditionLoaded(false)
            setProcedureLoaded(true)
        }
    }
    console.log('currPage: ??', currPage, 'setThisPage?', setThisPage)
    return (
        <div className="App">
            <Router>
                <HeaderWrap>
                    <h1>SNUH HIVE</h1>
                    <div className="pageButtons">
                        <Link to="/visitOut">
                            <HeaderButton
                                onClick={onClickPage}
                                currColor={(e) =>
                                    e.children === currPage
                                        ? '#6b6b83'
                                        : 'white'
                                }
                                selstat={visitLoaded}
                            >
                                <div className={visitLoaded ? 'selected' : ''}>
                                    Visits
                                </div>
                            </HeaderButton>
                        </Link>
                        <HeaderButton
                            onClick={onClickPage}
                            currColor={(e) =>
                                e.children === currPage ? '#6b6b83' : 'white'
                            }
                            selstat={conditionLoaded}
                        >
                            <div className={conditionLoaded ? 'selected' : ''}>
                                Conditions
                            </div>
                        </HeaderButton>
                        <HeaderButton
                            onClick={onClickPage}
                            currColor={(e) =>
                                e.children === currPage ? '#6b6b83' : 'white'
                            }
                            selstat={procedureLoaded}
                        >
                            <div className={procedureLoaded ? 'selected' : ''}>
                                Procedures
                            </div>
                        </HeaderButton>
                    </div>
                </HeaderWrap>
                <Route exact path="/" component={VisitOutpatient} />
                <Route exact path="/visitOut" component={VisitOutpatient} />
                <Route exact path="/visitIn" component={VisitInpatient} />
                <Route exact path="/childrenView" component={ChildrenView} />
            </Router>
        </div>
    )
}

export default App
