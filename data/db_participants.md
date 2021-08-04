mutation {
  participant_list: createTable(
    keyspaceName: "side_projects"
    tableName: "participant_list"
    ifNotExists: true
    partitionKeys: [{ name: "date", type: { basic: DATE } }]
    values: [
      {
          name: "voters"
          type: {
            basic: LIST
            info: {
              subTypes: [
                {
                  basic: MAP
                  info: { subTypes: [{ basic: TEXT }, { basic: TEXT }] }
                }
              ]
            }
          }
        }
    ]
  )
}



query getParticipants {
  participant_list(value: {date: "2021-08-01"}) {
    values {
      date
      voters{key, value}
    }
  }
}