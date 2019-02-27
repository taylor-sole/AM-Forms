SELECT * FROM leads
WHERE time_added >= $1
AND
time_added <= $2
ORDER BY
am_name ASC,
time_added ASC