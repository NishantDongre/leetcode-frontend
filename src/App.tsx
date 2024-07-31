import "./App.css";

import Navbar from "./components/Navbar";
import SideBar from "./components/Sidebar";
import ProblemDescription from "./pages/Description/ProblemDescription";

function App() {
    const markdownText = `##  21. Merge Two Sorted Lists
<br>

You are given the heads of two sorted linked lists \`list1\` and \`list2\`.

<br>

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

<br>

Return the head of the merged linked list.

<br>

***Example 1:***

![image](https://assets.leetcode.com/uploads/2020/10/03/merge_ex1.jpg)

<br>

&nbsp;&nbsp;&nbsp;&nbsp;**Input:** list1 = [1,2,4], list2 = [1,3,4]

&nbsp;&nbsp;&nbsp;&nbsp;**Output:** [1,1,2,3,4,4]

<br>

***Example 2:***
<br>

&nbsp;&nbsp;&nbsp;&nbsp;**Input:** list1 = [], list2 = []

&nbsp;&nbsp;&nbsp;&nbsp;**Output:** []

<br>

***Example 3:***
<br>

&nbsp;&nbsp;&nbsp;&nbsp;**Input**: list1 = [], list2 = [0]

&nbsp;&nbsp;&nbsp;&nbsp;**Output**: [0]

<br>

**Constraints:**

&nbsp;&nbsp;&nbsp;&nbsp; - The number of nodes in both lists is in the range [0, 50].

&nbsp;&nbsp;&nbsp;&nbsp; - 100 <= Node.val <= 100

&nbsp;&nbsp;&nbsp;&nbsp; - Both list1 and list2 are sorted in non-decreasing order.

`;

    return (
        <div className="h-[100vh]">
            <Navbar />
            <SideBar />
            <ProblemDescription descriptionText={markdownText} />
        </div>
    );
}

export default App;
