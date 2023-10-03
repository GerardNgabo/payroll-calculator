import React, { useState } from 'react';

const PayrollCalculator = () => {
    const [basicSal, setBasicSal] = useState('');
    const [accomodationAllowance, setAccomodationAllowance] = useState('');
    const [transportAllowance, setTransportAllowance] = useState('');
    const [firstDay, setFirstDay] = useState('');
    const [lastDay, setLastDay] = useState('');

    const [daysWorked, setDaysWorked] = useState(0);
    const [totalGrossSalary, setTotalGrossSalary] = useState(0);
    const [rssbBase, setRssbBase] = useState(0);
    const [pensionEmployee, setPensionEmployee] = useState(0);
    const [maternityEmployee, setMaternityEmployee] = useState(0);
    const [totalRssbEmployee, setTotalRssbEmployee] = useState(0);
    const [payeBase, setPayeBase] = useState(0);
    const [paye, setPaye] = useState(0);
    const [pensionEmployer, setPensionEmployer] = useState(0);
    const [maternityEmployer, setMaternityEmployer] = useState(0);
    const [pensionHazardEmployer, setPensionHazardEmployer] = useState(0);
    const [totalRssbEmployer, setTotalRssbEmployer] = useState(0);
    const [totalPension, setTotalPension] = useState(0);
    const [totalMaternity, setTotalMaternity] = useState(0);
    const [totalRssb, setTotalRssb] = useState(0);
    const [totalDeductionsEmployee, setTotalDeductionsEmployee] = useState(0);
    const [netSal, setNetSal] = useState(0);
    const [communityBasedHealthInsurance, setCommunityBasedHealthInsurance] = useState(0);
    const [otherSubscriptions, setOtherSubscriptions] = useState('');
    const [advances, setAdvances] = useState('');
    const [totalEmploymentCost, setTotalEmploymentCost] = useState('');
    const [netSalary, setNetSalary] = useState(0);

    const calculatePayroll = () => {
        const calculatedDaysWorked = lastDay - firstDay + 1;
        setDaysWorked(calculatedDaysWorked);
        
        const calculatedTotalGrossSalary = (parseFloat(basicSal) + parseFloat(accomodationAllowance) + parseFloat(transportAllowance)) * calculatedDaysWorked / 30;
        setTotalGrossSalary(calculatedTotalGrossSalary);

        setRssbBase(parseFloat(basicSal));
        setPensionEmployee(rssbBase * 0.03);
        setMaternityEmployee(rssbBase * 0.003);
        setTotalRssbEmployee(pensionEmployee + maternityEmployee);

        // PAYE BASE = K2
        setPayeBase(totalGrossSalary);
        
        // PAYE = IF(L2 < 60000, 0, IF(L2 < 100000, (L2 - 60000) * 0.2, (8000 + (L2 - 100000) * 0.3)))
        const calculatedPaye = payeBase < 60000 
            ? 0 
            : (payeBase < 100000 
                ? (payeBase - 60000) * 0.2 
                : (8000 + (payeBase - 100000) * 0.3));
        setPaye(calculatedPaye);
     
        // PENSION EMPLOYER 3% = N2 * 3%
        setPensionEmployer(rssbBase * 0.03);

        // MATERNITY EMPLOYER 0.3% = N2 * 0.3%
        setMaternityEmployer(rssbBase * 0.003);
        
        // PENSION HAZARD EMPLOYER 2% = N2 * 2%
        setPensionHazardEmployer(rssbBase * 0.02);
        
        // RSSB 5.3% (TOTAL EMPLOYER) = R2 + T2 + S2
        setTotalRssbEmployer(pensionEmployer + pensionHazardEmployer + maternityEmployer);
        
        // TOTAL PENSION (8%) = O2 + R2 + T2
        setTotalPension(pensionEmployee + pensionEmployer + pensionHazardEmployer);
        
        // TOTAL MATERNITY (0.6%) = P2 + S2
        setTotalMaternity(maternityEmployee + maternityEmployer);
        
        // RSSB 8.6% (TOTAL EMPLOYEE+EMPLOYER) = Q2 + U2
        setTotalRssb(totalRssbEmployee + totalRssbEmployer);
        
        // TOTAL DEDUCTIONS EMPLOYEE = M2 + Q2
        setTotalDeductionsEmployee(paye + totalRssbEmployee);
        
        // NET SAL = K2 − Y2
        setNetSal(totalGrossSalary - totalDeductionsEmployee);
        // 0.5% COMMUNITY BASED HEALTH INSURANCE EMPLOYEE = Z2*0.5/100
        setCommunityBasedHealthInsurance(netSal * 0.005);

        // NET SALARY = Z2 - AA2 - AB2 - AC2
        // Assuming AA2 = otherSubscriptions, AB2 = advances, and AC2 = communityBasedHealthInsurance
        setNetSalary(netSal - parseFloat(otherSubscriptions || 0) - parseFloat(advances || 0) - communityBasedHealthInsurance);
        
               // ... Additional calculations as per your requirements
    };

    return (
        <div>
            <h1>Payroll Calculator</h1>
            
            {/* Input Fields */}
            <label>
                Basic Salary (H2):
                <input type="number" value={basicSal} onChange={(e) => setBasicSal(e.target.value)} />
            </label>
            <label>
                Accomodation Allowance (I2):
                <input type="number" value={accomodationAllowance} onChange={(e) => setAccomodationAllowance(e.target.value)} />
            </label>
            <label>
                Transport Allowance (J2):
                <input type="number" value={transportAllowance} onChange={(e) => setTransportAllowance(e.target.value)} />
            </label>
            <label>
                First Day of Month Worked (E2):
                <input type="number" value={firstDay} onChange={(e) => setFirstDay(e.target.value)} />
            </label>
            <label>
                Last Day of Month Worked (F2):
                <input type="number" value={lastDay} onChange={(e) => setLastDay(e.target.value)} />
            </label>
            <label>
                Other Subscriptions (AA2):
                <input type="number" value={otherSubscriptions} onChange={(e) => setOtherSubscriptions(e.target.value)} />
            </label>
            <label>
                Advances (AB2):
                <input type="number" value={advances} onChange={(e) => setAdvances(e.target.value)} />
            </label>
            <label>
                Total Employment Cost (AC2):
                <input type="number" value={totalEmploymentCost} onChange={(e) => setTotalEmploymentCost(e.target.value)} />
            </label>
            
            
            
            {/* Calculate Button */}
            <button onClick={calculatePayroll}>Calculate</button>
            
            {/* Results */}
            <h2>Results</h2>
            <p>Days Worked: {daysWorked}</p>
            <p>Total Gross Salary: {totalGrossSalary}</p>
            <p>RSSB BASE (H2): {rssbBase}</p>
            <p>PENSION EMPLOYEE 3%: {pensionEmployee}</p>
            <p>MATERNITY EMPLOYEE 0.3%: {maternityEmployee}</p>
            <p>RSSB 3.3% (TOTAL EMPLOYEE): {totalRssbEmployee}</p>
            <p>PAYE BASE: {payeBase}</p>
            <p>PAYE: {paye}</p>
            <p>PENSION EMPLOYER 3%: {pensionEmployer}</p>
            <p>MATERNITY EMPLOYER 0.3%: {maternityEmployer}</p>
            <p>PENSION HAZARD EMPLOYER 2%: {pensionHazardEmployer}</p>
            <p>RSSB 5.3% (TOTAL EMPLOYER): {totalRssbEmployer}</p>
            <p>TOTAL PENSION (8%): {totalPension}</p>
            <p>TOTAL MATERNITY (0.6%): {totalMaternity}</p>
            <p>RSSB 8.6% (TOTAL EMPLOYEE+EMPLOYER): {totalRssb}</p>
            <p>TOTAL DEDUCTIONS EMPLOYEE: {totalDeductionsEmployee}</p>
            <p>NET SAL: {netSal}</p>
            {/* Add more result fields as per your requirements */}
        </div>
    );
};

export default PayrollCalculator;
