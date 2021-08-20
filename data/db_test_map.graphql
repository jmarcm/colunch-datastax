mutation {
  test_map: createTable(
    keyspaceName: "side_projects"
    tableName: "test_map"
    partitionKeys: [{ name: "badge_type", type: { basic: TEXT } }]
    values: [
      {
        name: "earned"
        type: {
          basic: MAP
          info: { subTypes: [{ basic: TEXT }, { basic: DATE }] }
        }
      }
    ]
  )
}


mutation insertVotes {
  inserttest_map(
    value: {
      badge_type: "Two",
      earned: {key: "date", value: "2021-08-01"}
    }
  )
	{
    value{badge_type, earned{key, value}}
  }
}