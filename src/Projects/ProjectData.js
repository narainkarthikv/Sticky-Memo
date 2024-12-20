// import { v4 as uuidv4 } from "uuid";

export const CandidatesData = [
    {
      id: "1",
      task: "Lorem ipsum dolor sit amet.",
      assigned_To: 'Beltran',
      assignee: 'Romona',
      Status: 'To-do',
      priority: 'Low',
      due_Date: "25-May-2020",
    },
    {
      id: "2",
      task: "Fix Styling",
      assigned_To: 'Dave',
      assignee: 'Romona',
      Status: 'To-do',
      priority: 'Low',
      due_Date: "26-May-2020",
    },
    {
      id: "3",
      task: "Handle Door Specs",
      assigned_To: 'Roman',
      assignee: 'Romona',
      Status: 'To-do',
      priority: 'Low',
      due_Date: "27-May-2020",
    },
    {
      id: "4",
      task: "morbi",
      assigned_To: 'Gawen',
      assignee: 'Kai',
      Status: 'Done',
      priority: 'High',
      due_Date: "23-Aug-2020",
    },
    {
      id: "5",
      task: "proin",
      assigned_To: 'Bondon',
      assignee: 'Antoinette',
      Status: 'In Progress',
      priority: 'Medium',
      due_Date: "05-Jan-2021",
    },
  ];
  
  export const columnsFromBackend = {
    1: {
      title: 'To-Do',
      items: CandidatesData.filter(item => item.Status === 'To-do'),
    },
    2: {
      title: 'In Progress',
      items: CandidatesData.filter(item => item.Status === 'In Progress'),
    },
    3: {
      title: 'Testing',
      items: [],
    },
    4: {
      title: 'Done',
      items: CandidatesData.filter(item => item.Status === 'Done'),
    },
  };
  