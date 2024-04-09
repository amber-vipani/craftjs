import { useEditor } from "@craftjs/core";
import React from "react";

export const SettingsPanel = () => {
  const { actions, selected, isEnabled } = useEditor((state, query) => {
    const currentNodeId = query.getEvent("selected").last();
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
      isEnabled: state.options.enabled,
    };
  });

  return isEnabled && selected ? (
    <div className="bg-gray-200 mt-2 px-2 py-2">
      <div className="space-y-2">
        <div className="pb-2">
          <div className="flex items-center">
            <div className="flex-grow">
              <p className="text-lg font-semibold">Selected</p>
            </div>
            <div>
              <span className="inline-block bg-blue-500 text-white px-2 py-1 rounded-sm text-xs font-semibold">
                {selected.name}
              </span>
            </div>
          </div>
        </div>
        <div className="settings-panel" data-cy="settings-panel">
          {selected.settings && React.createElement(selected.settings,{isDeletable:selected.isDeletable})}
        </div>
        {selected.id != 'ROOT' ? (
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-sm"
            onClick={() => {
              actions.delete(selected.id);
            }}
          >
            Delete
          </button>
        ) : null}
      </div>
    </div>
  ) : null;
};
