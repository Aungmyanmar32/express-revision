//url

// address : port / route / params ? query-string

// http://localhost:5000/ <-- root route

// http://localhost:5000/menu/2 <-- params
req.params "2"

//  http://localhost:5000/menu/40?user=koaung&age=45
req.query.user
req.query.age "45"
{user:"koaung",age:"45"}