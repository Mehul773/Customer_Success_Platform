const Project = require("../models/projectModel");

const generateProjectHtml = (projectDoc) => {
  const formateDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-GB");
  };
  let htmlContent = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Project Details</title>
        <style>
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th,
          td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h1>Audit History</h1>
        <table>
          <thead>
            <tr>
              <th>Date of Audit</th>
              <th>Reviewed By</th>
              <th>Status</th>
              <th>Comment/Queries</th>
              <th>Action Item</th>
            </tr>
          </thead>
          <tbody>`;
  // Add data dynamically for audit history
  projectDoc[0]?.project_audit_history.map((auditHistory) => {
    htmlContent += `
                    <tr>
                      <td>${formateDate(auditHistory.dateOfAudit)}</td>
                      <td>${auditHistory.reviewedBy}</td>
                      <td>${auditHistory.status}</td>
                      <td>${auditHistory.comment}</td>
                      <td>${auditHistory.actionItem}</td>
                    </tr>`;
  });

  // Close the table and body tags
  htmlContent += `
            
          </tbody>
        </table>
  
        <h1>Project Budget</h1>
        <table>
          <thead>
            <tr>
              <th>Project Type</th>
              <th>Duration (in months)</th>
              <th>Budgeted Hours</th>
            </tr>
          </thead>
          <tbody>`;
  // Add data dynamically for budget
  projectDoc[0]?.project_budget.map((budget) => {
    htmlContent += `
            <tr>
              <td>${budget.type}</td>
              <td>${budget.duration}</td>
              <td>${budget.budgetedHours}</td>
            </tr>`;
  });

  // Close the table and body tags
  htmlContent += `</tbody>
        </table>
  
        <h1>Version History</h1>
        <table>
          <thead>
            <tr>
              <th>Version</th>
              <th>Type</th>
              <th>Change</th>
              <th>Change Reason</th>
              <th>Created By</th>
              <th>Revision Date</th>
              <th>Approval Date</th>
              <th>Approved By</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Initial</td>
              <td>Project initiation</td>
              <td>N/A</td>
              <td>Admin</td>
              <td>2024-02-28</td>
              <td>2024-02-28</td>
              <td>Admin</td>
            </tr>
          </tbody>
        </table>
  
        <h1>Project Description</h1>
        <p>`;
  htmlContent += projectDoc[0]?.project_desc;
  htmlContent += `</p>
  
        <h1>Scope</h1>
        <p>`;
  htmlContent += projectDoc[0]?.project_scope;
  htmlContent += `</p>
  
        <h1>Project Stack (Tech)</h1>
        `;
  htmlContent += projectDoc[0]?.project_stack;
  htmlContent += `</p>
  
        
  
        <h1>Escalation Matrix</h1>
        <h2>Operational Escalation Matrix</h2>
        <table>
          <thead>
            <tr>
              <th>Escalation Level</th>
              <th>Responsible</th>
            </tr>
          </thead>
          <tbody>
            `;
  // Add data dynamically for matric
  projectDoc[0]?.project_operational_matrix.map((matrix) => {
    htmlContent += `
                              <tr>
                                <td>${matrix.level}</td>
                                <td>${matrix.name}</td>
                              </tr>`;
  });

  // Close the table and body tags
  htmlContent += `
          </tbody>
        </table>
        <h2>Financial Escalation Matrix</h2>
        <table>
          <thead>
            <tr>
              <th>Escalation Level</th>
              <th>Responsible</th>
            </tr>
          </thead>
          <tbody>
            `;
  // Add data dynamically for matric
  projectDoc[0]?.project_financial_matrix.map((matrix) => {
    htmlContent += `
                                        <tr>
                                          <td>${matrix.level}</td>
                                          <td>${matrix.name}</td>
                                        </tr>`;
  });

  // Close the table and body tags
  htmlContent += `
          </tbody>
        </table>
        <h2>Technical Escalation Matrix</h2>
        <table>
          <thead>
            <tr>
              <th>Escalation Level</th>
              <th>Responsible</th>
            </tr>
          </thead>
          <tbody>
            `;
  // Add data dynamically for matric
  projectDoc[0]?.project_technical_matrix.map((matrix) => {
    htmlContent += `
                                        <tr>
                                          <td>${matrix.level}</td>
                                          <td>${matrix.name}</td>
                                        </tr>`;
  });

  // Close the table and body tags
  htmlContent += `
          </tbody>
        </table>
  
  
        <h1>Stakeholders</h1>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Name</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            `;
  projectDoc[0]?.project_stackholder.map((stackholder) => {
    htmlContent += `
                    <tr>
                      <td>${stackholder.role}</td>
                      <td>${stackholder.name}</td>
                      <td>${stackholder.contact}</td>
                    </tr>`;
  });
  htmlContent += `
          </tbody>
        </table>
  
        <h1>Risk Profiling</h1>
        <table>
      <thead>
      <tr>
      <th>Risk Type</th>
      <th>Description</th>
      <th>Severity</th>
      <th>Impact</th>
      <th>Remedial Steps</th>
      <th>Status</th>
      <th>Closure Date</th>
      </tr>
      </thead>
      <tbody>`;

  projectDoc[0]?.project_risks.map((risk) => {
    htmlContent += `
      <tr>
      <td>${risk.type}</td>
      <td>${risk.description}</td>
      <td>${risk.severity}</td>
      <td>${risk.impact}</td>
      <td>${risk.remedialSteps}</td>
      <td>${risk.status}</td>
      <td>${formateDate(risk.closureDate)}</td>
      </tr>`;
  });

  htmlContent += `
      </tbody>
      </table>
        <h1>Phases/Milestones</h1>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Start Date</th>
              <th>Completion Date</th>
              <th>Approval Date</th>
              <th>Status</th>
              <th>Revised Completion Date</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            `;

  projectDoc[0]?.project_phases.map((phase) => {
    htmlContent += `
              <tr>
              <td>${phase.title}</td>
              <td>${formateDate(phase.startDate)}</td>
              <td>${formateDate(phase.completionDate)}</td>
              <td>${formateDate(phase.approvalDate)}</td>
              <td>${phase.status}</td>
              <td>${formateDate(phase.revisedCompletionDate)}</td>
              <td>${phase.comments}</td>
              </tr>`;
  });

  htmlContent += `
          </tbody>
        </table>
  
        <h1>Sprint wise detail</h1>
        <table>
          <thead>
            <tr>
              <th>Sprint</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            `;

  projectDoc[0]?.project_sprints.map((mySprint) => {
    htmlContent += `
              <tr>
              <td>${mySprint.sprint}</td>
              <td>${formateDate(mySprint.startDate)}</td>
              <td>${formateDate(mySprint.endDate)}</td>
              <td>${mySprint.status}</td>
              <td>${mySprint.comments}</td>
              </tr>`;
  });

  htmlContent += `
          </tbody>
        </table>
  
        <h1>Detailed timeline reference</h1>
        <p>Provide timeline</p>
      </body>
    </html>
    `;

  return htmlContent;
};

const generateAuditHistoryHtml = (projectDoc) => {
  const formateDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-GB");
  };
  let htmlContent = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Project Details</title>
        <style>
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th,
          td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h1>Audit History</h1>
        <table>
          <thead>
            <tr>
              <th>Date of Audit</th>
              <th>Reviewed By</th>
              <th>Status</th>
              <th>Comment/Queries</th>
              <th>Action Item</th>
            </tr>
          </thead>
          <tbody>`;
  // Add data dynamically for audit history
  projectDoc[0]?.project_audit_history.map((auditHistory) => {
    htmlContent += `
                    <tr>
                      <td>${formateDate(auditHistory.dateOfAudit)}</td>
                      <td>${auditHistory.reviewedBy}</td>
                      <td>${auditHistory.status}</td>
                      <td>${auditHistory.comment}</td>
                      <td>${auditHistory.actionItem}</td>
                    </tr>`;
  });

  // Close the table and body tags
  htmlContent += `
            
          </tbody>
        </table>
      </body>
    </html>
    `;

  return htmlContent;
};
module.exports = { generateProjectHtml, generateAuditHistoryHtml };
