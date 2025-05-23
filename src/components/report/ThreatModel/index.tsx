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

import { FC, useMemo } from 'react';
import ThreatModelView from './components/ThreatModelView';
import { useGlobalSetupContext, useWorkspacesContext } from '../../../contexts';
import useImportExport from '../../../hooks/useExportImport';
import useHasContent from '../../../hooks/useHasContent';
import getExportFileName from '../../../utils/getExportFileName';

export interface ThreatModelProps {
  onPrintButtonClick?: () => void;
  isPreview?: boolean;
}

const ThreatModel: FC<ThreatModelProps> = ({
  onPrintButtonClick,
  ...props
}) => {
  const { getWorkspaceData } = useImportExport();
  const { composerMode } = useGlobalSetupContext();
  const [_, hasContentDetails] = useHasContent();
  const { currentWorkspace } = useWorkspacesContext();

  const downloadFileName = useMemo(() => {
    return getExportFileName(composerMode, false, currentWorkspace);
  }, [composerMode, currentWorkspace]);

  const {
    onApplicationInfoView,
    onArchitectureView,
    onDataflowView,
    onDiagramView,
    onAssumptionListView,
    onThreatListView,
    onMitigationListView,
    onControlListView,
  } = useWorkspacesContext();
  return <ThreatModelView
    {...props}
    onPrintButtonClick={onPrintButtonClick}
    composerMode={composerMode}
    data={getWorkspaceData()}
    downloadFileName={downloadFileName}
    hasContentDetails={hasContentDetails}
    onApplicationInfoView={onApplicationInfoView}
    onArchitectureView={onArchitectureView}
    onDataflowView={onDataflowView}
    onDiagramView={onDiagramView}
    onAssumptionListView={onAssumptionListView}
    onThreatListView={onThreatListView}
    onMitigationListView={onMitigationListView}
    onControlListView={onControlListView}
  />;
};

export default ThreatModel;
