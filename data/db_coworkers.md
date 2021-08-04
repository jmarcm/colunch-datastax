mutation {
  coworker_list: createTable (
    keyspaceName:"side_projects",
    tableName: "coworker_list",
    ifNotExists:true
    partitionKeys: [
      {name: "firstname", type: {basic: TEXT}}
    ]
    clusteringKeys: [
      {name: "vegetarien", type: {basic: BOOLEAN}, order: "ASC"}
    ]
    values: [
      {name: "name", type : {basic: TEXT}},
      {name: "telephone", type: {basic: TEXT}},
      {name: "adresse", type : {basic: TEXT}},
    ]
  )
}


mutation insertCoworkers {
  oceane: insertcoworker_list(
    value: {
      firstname: "Océane"
      name: "D",
      vegetarien: false
    }
  ) {
    value{firstname, name}
  }
  david: insertcoworker_list(
    value: {
      firstname: "David"
      name: "S",
      vegetarien: false
    }
  ) {
    value{firstname}
  }
  helene: insertcoworker_list(
    value: {
      firstname: "Hélène"
      name: "B",
      vegetarien: true
    }
  ) {
    value{firstname}
  }
}

query getAllCoworkers {
  coworker_list(value: {}) {
    values {
      firstname,
      name,
      vegetarien,
      telephone,
      adresse
    }
  }
}


mutation Coworker_list {
  coworker_list: createTable (
    keyspaceName:"side_projects",
    tableName: "coworker_list",
    ifNotExists:true
    partitionKeys: [
      {name: "firstname", type: {basic: TEXT}},
      {name: "name", type : {basic: TEXT}, order: "ASC"},
      {name: "login", type: {basic: TEXT}},
      {name: "password", type: {basic: TEXT}},
    ]
    clusteringKeys: [
      {name: "vegetarien", type: {basic: BOOLEAN}, order: "ASC"}      
    ]
    values: [
      {name: "telephone", type: {basic: TEXT}},
      {name: "adresse", type : {basic: TEXT}},
    ]
  )
}

mutation Coworker_list {
  coworker_list: createTable (
    keyspaceName:"side_projects",
    tableName: "coworker_list",
    ifNotExists:true
    partitionKeys: [
      {name: "firstname", type: {basic: TEXT}},
      {name: "name", type : {basic: TEXT}}
    ]
    clusteringKeys: [
      {name: "vegetarien", type: {basic: BOOLEAN}, order: "ASC"}      
    ]
    values: [
      {name: "telephone", type: {basic: TEXT}},
      {name: "adresse", type : {basic: TEXT}},
    ]
  )
}