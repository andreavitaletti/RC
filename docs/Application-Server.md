In the section on HTTP, we have mainly seen how to access static resources, but we have also had a look to dynamic pages generated in PHP.

In this section we will go further on the generation of dynamic content by an**Application Server (AS)**. While a Web server is designed to manage static resources (e.g. Web pages), the AS allow us to generate Web pages on the fly according to a specific business logic.   

As an example, consider a Web page showing the content of an information system (e.g. a timetable). As soon as the timetable changes, the corresponding Web page has to change. 

This is possible, because the AS, when responding to an http request for the timetable, first access the information system to get fresh information, and then presents this information in a suitable format (e.g. HTML). To implement such logic, the AS exploits a specific language. There are thousands of solutions for [server side scripting](https://en.wikipedia.org/wiki/Server-side_scripting).

We will focus on [Nodejs](https://nodejs.org/en/)