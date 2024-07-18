export default function StatViewer({ stats }: { stats: any }) {
  const stat_rows = stats.map(
    (stat: { name: string; avg: number }, index: number) => (
      <tr key={stat.name}>
        <td>{index + 1}</td>
        <td>{stat.name}</td>
        <td>
          {stat.name == "tempo"
            ? `${stat.avg.toFixed(2)} bpm`
            : `${(stat.avg * 100).toFixed(2)}%`}
        </td>
      </tr>
    )
  );
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Stat</th>
            <th>Avg</th>
          </tr>
        </thead>
        <tbody>{stat_rows}</tbody>
      </table>
    </>
  );
}
