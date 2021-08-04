mutation Coworker_password_list {
  coworker_password_list: createTable (
    keyspaceName:"side_projects",
    tableName: "coworker_password_list",
    ifNotExists:true
    partitionKeys: [
      {name: "login", type: {basic: TEXT}},
      {name: "password", type: {basic: TEXT}}
    ]
    values: [
      {name: "firstname", type: {basic: TEXT}},
      {name: "name", type : {basic: TEXT}}
    ]
  )
}

