(async () => {
  const data = await fetch("./data.json");
  const response = await data.json();

  let employees = response;
  let selectedEmployee = employees[0];
  let selectedEmployeeId = employees[0].id;

  const employeeList = document.querySelector(".employees__names--list");
  const employeeInfo = document.querySelector(".employees__single--info");
  const editEmployee = document.querySelector(".employee__single--edit");
  const addEditEmployeeTitle = document.querySelector(
    ".addEmployee__create--title"
  );

  // Add employee logic
  const createEmployee = document.querySelector(".createEmployee");
  const addEmployeeModal = document.querySelector(".addEmployee");
  const addEmployeeForm = document.querySelector(".addEmployee__create");

  createEmployee.addEventListener("click", () => {
    addEmployeeForm.reset();
    addEmployeeModal.style.display = "flex";
    addEditEmployeeTitle.innerText = "Add a new employee";
  });
  addEmployeeModal.addEventListener("click", (e) => {
    if (e.target.className === "addEmployee") {
      addEmployeeModal.style.display = "none";
    }
  });

  // prevent date select if user's age is less than 18
  const dobInput = document.querySelector(".addEmployee__create--dob");
  dobInput.max = `${new Date().getFullYear() - 18}-${new Date()
    .toISOString()
    .slice(5, 10)}`;

  addEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(addEmployeeForm);
    const values = [...formData.entries()];
    const empData = {};
    values.forEach((val) => {
      empData[val[0]] = val[1];
    });

    empData.age =
      new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10);
    const imageUrlPattern =
      /^(https?:\/\/)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/g;
    empData.imageUrl =
      empData.imageUrl && imageUrlPattern.test(empData.imageUrl)
        ? empData.imageUrl
        : "https://cdn-icons-png.flaticon.com/512/0/93.png";

    // adding new employee
    if (addEditEmployeeTitle.innerText === "Add a new employee") {
      empData.id =
        employees.length >= 1 ? employees[employees.length - 1].id + 1 : 0;
      employees.push(empData);
      if (employees.length === 1) {
        selectedEmployee = employees[0];
        selectedEmployeeId = employees[0].id;
      }
    } else {
      empData.id = parseInt(selectedEmployeeId);
      // editing existing employee
      employees = employees.map((emp) =>
        emp.id === parseInt(selectedEmployeeId) ? empData : emp
      );
    }
    addEmployeeForm.reset();
    addEmployeeModal.style.display = "none";
    renderEmployees();
    renderSingleEmployee();
  });

  // Edit employee logic
  editEmployee.addEventListener("click", () => {
    if (employees.length === 0) return;

    addEmployeeModal.style.display = "flex";
    addEditEmployeeTitle.innerText = "Edit this employee";
    for (const [key, value] of Object.entries(selectedEmployee)) {
      const input = addEmployeeForm.elements[key];
      if (input) {
        input.value = value;
      }
    }
  });

  // select employee logic
  employeeList.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN" && selectedEmployeeId !== e.target.id) {
      selectedEmployeeId = e.target.id;
      renderEmployees();
      renderSingleEmployee();
    }

    // employee delete logic
    if (e.target.tagName === "I") {
      employees = employees.filter(
        (emp) => String(emp.id) !== e.target.parentNode.id
      );

      if (String(selectedEmployeeId) === e.target.parentNode.id) {
        selectedEmployeeId = employees[0]?.id || -1;
        selectedEmployee = employees[0] || {};
        renderSingleEmployee();
      }
      renderEmployees();
    }
  });

  // render employees
  const renderEmployees = () => {
    employeeList.innerHTML = "";
    employees.forEach((emp) => {
      const employee = document.createElement("span");
      employee.classList.add("employees__names--item");

      if (parseInt(selectedEmployeeId, 10) === emp.id) {
        employee.classList.add("selected");
        selectedEmployee = emp;
      }

      employee.setAttribute("id", emp.id);
      employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeDelete" title="Delete">❌</i>`;
      employeeList.append(employee);
    });
  };

  // render single employee
  const renderSingleEmployee = () => {
    if (selectedEmployeeId === -1) {
      employeeInfo.innerHTML = "";
      return;
    }

    employeeInfo.innerHTML = `
    <img src="${selectedEmployee.imageUrl}"/>
    <span class="employees__single--heading">${selectedEmployee.firstName} ${
      selectedEmployee.lastName
    } (${selectedEmployee.age})</span>
    <span>${selectedEmployee.address}</span>
    <span>${selectedEmployee.email}</span>
    <span>Mobile - ${selectedEmployee.contactNumber}</span>
    <span>DOB - ${selectedEmployee.dob.split("-").reverse().join("-")}</span>
    `;
  };

  renderEmployees();

  if (selectedEmployee) renderSingleEmployee();
})();
