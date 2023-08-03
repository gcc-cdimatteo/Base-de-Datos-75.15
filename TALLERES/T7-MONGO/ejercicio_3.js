[
  {
    $match: {
      source: /android|iphone/,
      "place.country": "Argentina",
    },
  },
  {
    $group: {
      _id: { $ifNull: [ // coalesce 
        "$in_reply_to_status_id_str",
        "$_id",
      ]},
      tweets: { $push: {
        tweet_id: "$_id",
        text: "$full_text",
        user: "$user",
        created_at: "$created_at.date",
      }},
      avg_retweets: { $avg: "$retweet_count" },
    },
  },
  {
    $project: {
      text: { $ifNull: [{ $arrayElemAt: [{
        $filter: {
          input: "$tweets",
          as: "reply",
          cond: { 
            $eq: ["$$reply.tweet_id", "$_id"],
          },
        },
      }, 0 ]}, null ]}, // dejamos en null si no encontramos
      replies: { $sortArray: { input: {
        $filter: {
          input: "$tweets",
          as: "reply",
          cond: {
            $ne: ["$$reply.tweet_id", "$_id"],
          },
        },
      }, sortBy: {created_at: 1} } },
      avg_retweets: 1,
    },
  },
]
