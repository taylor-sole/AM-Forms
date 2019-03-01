SELECT * FROM leads
WHERE am_email = $3
AND time_added
BETWEEN $1 AND $2
ORDER BY
time_added ASC