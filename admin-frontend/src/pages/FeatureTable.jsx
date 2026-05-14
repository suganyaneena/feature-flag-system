export default function FeatureTable({
  features,
  deleteFeature,
}) {
  return (
    <table className="w-full border">

      <thead>
        <tr className="bg-gray-200">
          <th>ID</th>
          <th>Feature</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>

        {features.map((item) => (
          <tr
            key={item.id}
            className="text-center border-t"
          >
            <td>{item.id}</td>

            <td>
              {item.feature_key}
            </td>

            <td>
              {item.enabled
                ? "Enabled"
                : "Disabled"}
            </td>

            <td>
              <button
                onClick={() =>
                  deleteFeature(
                    item.id
                  )
                }
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}

      </tbody>
    </table>
  );
}