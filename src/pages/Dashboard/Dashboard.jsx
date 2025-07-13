import React, { useCallback, useEffect, useState } from 'react'

import HOC from '../../components/HOC/HOC'
import TopDashboard from './TopDashboard'
import BottomDashboard from './BottomDashboard'
import { getApi } from '../../Repository/Api'
import endPoints from '../../Repository/apiConfig'


import img from '../../assest/loading1.gif'




const Dashboard = () => {
  const [Data, setData] = useState({});
  const [loading, setLoading] = useState(false);


  const fetchData = useCallback(async () => {
    await getApi(endPoints.getallCount, {
      setResponse: setData,
      setLoading: setLoading,
      errorMsg: "Failed to fetch data!",
    })
  }, []);

  useEffect(() => {
    fetchData()
  }, [fetchData])






  return (
    <>
      {loading ?
        <div className='normalloading'>
          <img src={img} alt="" />
        </div>
        :
        <div className='dashboardcontainer'>
          <div className='dashboardtop'>
            <TopDashboard Data={Data?.dashboard} />
          </div>
          <div className='dashboardmiddle'>
            <BottomDashboard />
          </div>
        </div>
      }
    </>
  )
}

export default HOC(Dashboard)