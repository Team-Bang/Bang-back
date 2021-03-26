curl "http://localhost:4741/blogposts/${ID}/comments" \
  --include \
  --request POST \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "comment": {
      "reply": "'"${REPLY}"'"
    }
  }'

echo
