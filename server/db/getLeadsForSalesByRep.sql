SELECT * FROM leads_for_sales
WHERE assigned_sales_rep = $1
ORDER BY
time_added ASC