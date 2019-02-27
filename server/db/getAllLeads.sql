SELECT * FROM leads
WHERE time_added
BETWEEN $1 AND $2
ORDER BY
am_name ASC,
time_added ASC