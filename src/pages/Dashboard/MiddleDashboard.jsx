import React, { useCallback, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { getApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';
import img from '../../assest/loading1.gif';

const MiddleDashboard = () => {
    const [series, setSeries] = useState([{ name: 'Sales', data: Array(12).fill(0) }]);
    const [isLoading, setLoading] = useState(false);
    const [isLoading1, setLoading1] = useState(false);
    const [labels, setLabels] = useState([]);
    const [series1, setSeries1] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedYear1, setSelectedYear1] = useState(new Date().getFullYear());

    const fetchData = useCallback(async () => {
        setSeries([{ name: 'Sales', data: Array(12).fill(0) }]);
        await getApi(endPoints.getAdminEarningsByMonth(selectedYear), {
            setResponse: (response) => {
                if (response?.data) {
                    const earnings = response.data.map((item) => item.earnings || 0);
                    setSeries([{ name: 'Sales', data: earnings }]);
                }
            },
            setLoading,
            errorMsg: 'Failed to fetch earnings data!',
        });
    }, [selectedYear]);

    const fetchPopularServices = useCallback(async () => {
        setLabels([]); // Reset labels
        setSeries1([]); // Reset data while fetching
        await getApi(endPoints.getpopularserviceByMonth(selectedYear1), {
            setResponse: (response) => {
                if (response?.data) {
                    const categories = response.data.map((item) => item.mainCategory);
                    const orderCounts = response.data.map((item) =>
                        item.services.reduce((sum, service) => sum + service.orderCount, 0)
                    );
                    setLabels(categories);
                    setSeries1(orderCounts);
                }
            },
            setLoading: setLoading1,
            errorMsg: 'Failed to fetch popular services data!',
        });
    }, [selectedYear1]);

    // useEffect(() => {
    //     fetchPopularServices();
    // }, [fetchPopularServices]);

    // useEffect(() => {
    //     fetchData();
    // }, [fetchData]);


    const options = {
        chart: {
            type: 'area',
            toolbar: { show: false },
            zoom: { enabled: false },
        },
        dataLabels: { enabled: false },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            labels: { style: { colors: '#000000', fontSize: '15px' } },
        },
        stroke: { curve: 'smooth', width: 2 },
        markers: { size: 4 },
        fill: { colors: ['#FF5534'], opacity: 0.3 },
    };

    const options1 = {
        chart: { type: 'donut' },
        labels: labels,
        colors: ['#8979FF', '#FF928A', '#3CC3DF', '#FFAE4C', '#537FF1', '#6FD195'],
        legend: { position: 'right' },
        dataLabels: { enabled: false },
        plotOptions: {
            pie: {
                donut: {
                    size: '70%',
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: 'Yearly',
                            formatter: () => selectedYear1,
                        },
                    },
                },
            },
        },
        tooltip: {
            y: {
                formatter: (value) => `${value} orders`,
            },
        },
    };

    const yearOptions = Array.from({ length: 13 }, (_, index) => {
        const year = 2023 + index;
        return { label: year.toString(), value: year.toString() };
    });


    return (
        <div className='middledashboardcontainer'>
            <div className='middledashboard1'>
                <div className='middledashboard2'>
                    <div className='middledashboard3'>
                        <p>Total Revenue</p>
                        <div className='middledashboard4'>
                            <h6>₹{series[0].data.reduce((acc, curr) => acc + curr, 0)}</h6>
                        </div>
                    </div>
                    <div className='middledashboard6'>
                        <select
                            name=""
                            id="year-select"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}>
                            <option value="">Select</option>
                            {yearOptions.map((year, index) => (
                                <option key={index} value={year.value}>
                                    {year.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='chart1'>
                    {isLoading ? (
                        <div className='normalloading'>
                            <img src={img} alt='Loading' />
                        </div>
                    ) : (
                        <Chart options={options} series={series} type='area' height={300} />
                    )}
                </div>
            </div>
            <div className='middledashboard7'>
                <div className='middledashboard2'>
                    <div className='middledashboard3'>
                        <p>Popular Services</p>
                    </div>
                    <div className='middledashboard8'>
                        <div className='middledashboard6'>
                            <select
                                name=""
                                id="year-select"
                                value={selectedYear1}
                                onChange={(e) => setSelectedYear1(e.target.value)}>
                                <option value="">Select</option>
                                {yearOptions.map((year, index) => (
                                    <option key={index} value={year.value}>
                                        {year.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className='chart2'>
                    {isLoading1 ? (
                        <div className='normalloading'>
                            <img src={img} alt='Loading' />
                        </div>
                    ) : series1.length === 0 || series1.every(value => value === 0) ? (
                        <div className='nodata-message'>
                            <p>No data available.</p>
                        </div>
                    ) : (
                        <Chart options={options1} series={series1} type='donut' width={350} height={600} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default MiddleDashboard;
