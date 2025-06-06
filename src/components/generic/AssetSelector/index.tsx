/** *******************************************************************************************************************
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.

  Licensed under the Apache License, Version 2.0 (the "License").
  You may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
 ******************************************************************************************************************** */

import Multiselect from '@cloudscape-design/components/multiselect';
import React, { FC, useMemo } from 'react';

export interface AssetSelectorProps {
  allAssets: string[];
  selectedAssets: string[];
  setSelectedAssets: React.Dispatch<React.SetStateAction<string[]>>;
}

const AssetSelector: FC<AssetSelectorProps> = ({
  allAssets,
  selectedAssets,
  setSelectedAssets,
}) => {
  const sortedAssets = useMemo(() => {
    return allAssets.sort((a, b) => {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });
  }, [allAssets]);

  return (<Multiselect
    tokenLimit={0}
    selectedOptions={selectedAssets.map(ia => ({
      label: ia,
      value: ia,
    }))}
    onChange={({ detail }) =>
      setSelectedAssets(detail.selectedOptions?.map(o => o.value || '') || [])
    }
    deselectAriaLabel={e => `Remove ${e.label}`}
    options={sortedAssets.map(g => ({
      label: g,
      value: g,
    }))}
    filteringType="auto"
    placeholder="Filtered by Assets"
    selectedAriaLabel="Selected"
  />);
};

export default AssetSelector;
