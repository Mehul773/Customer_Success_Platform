const puppeteer = require("puppeteer");

const downloadAllContent = async (req, res) => {
  try {
    // Create a browser instance
    const browser = await puppeteer.launch();
    // Create a new page
    const page = await browser.newPage();

    // Example HTML content
    const htmlContent = `<!DOCTYPE html>
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
              <th>Reviewed Section</th>
              <th>Comment/Queries</th>
              <th>Action Item</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2024-03-01</td>
              <td>John Doe</td>
              <td>Completed</td>
              <td>Project Budget</td>
              <td>No queries</td>
              <td>None</td>
            </tr>
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
          <tbody>
            <tr>
              <td>Fixed Budget</td>
              <td>12</td>
              <td>1000</td>
            </tr>
          </tbody>
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
        <p>Project description here</p>
    
        <h1>Scope</h1>
        <p>Project scope</p>
    
        <h1>Project Stack (Tech)</h1>
        <ul>
          <li>Backend</li>
          <li>Frontend</li>
          <li>Mobile App</li>
          <li>Database</li>
        </ul>
    
        <h1>Infrastructure and Services</h1>
    
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
            <tr>
              <td>Level-1</td>
              <td>Project Manager</td>
            </tr>
            <tr>
              <td>Level-2</td>
              <td>Rinkesh Parikh</td>
            </tr>
            <tr>
              <td>Level-3</td>
              <td>Chintan Shah</td>
            </tr>
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
            <tr>
              <td>Level-1</td>
              <td>Project Manager</td>
            </tr>
            <tr>
              <td>Level-2</td>
              <td>Rinkesh Parikh</td>
            </tr>
            <tr>
              <td>Level-3</td>
              <td>Chintan Shah</td>
            </tr>
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
            <tr>
              <td>Level-1</td>
              <td>Project Manager</td>
            </tr>
            <tr>
              <td>Level-2</td>
              <td>Rinkesh Parikh</td>
            </tr>
            <tr>
              <td>Level-3</td>
              <td>Chintan Shah</td>
            </tr>
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
            <tr>
              <td>PM</td>
              <td>John Doe</td>
              <td>pm@example.com</td>
            </tr>
            <!-- Add more rows here -->
          </tbody>
        </table>
    
        <h1>Risk Profiling</h1>
    
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
            <tr>
              <td>Phase-1</td>
              <td>2024-01-01</td>
              <td>2024-03-01</td>
              <td>2024-03-05</td>
              <td>Signed-off</td>
              <td>N/A</td>
              <td>Phase 1 completed successfully</td>
            </tr>
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
            <tr>
              <td>1</td>
              <td>2024-03-01</td>
              <td>2024-03-15</td>
              <td>On-time</td>
              <td>No issues</td>
            </tr>
          </tbody>
        </table>
    
        <h1>Detailed timeline reference</h1>
        <p>Provide timeline</p>
      </body>
    </html>
    `;

    // Set the content of the page
    await page.setContent(htmlContent);

    // Downlaod the PDF
    const pdf = await page.pdf({ format: "A4", printBackground: true });

    // Close the browser instance
    await browser.close();

    // Send the PDF as a response
    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdf.length,
    });
    res.send(pdf);
  } catch (error) {
    console.error("Error converting HTML to PDF:", error);
    res.status(500).send("Error converting HTML to PDF");
  }
};

module.exports = { downloadAllContent };
