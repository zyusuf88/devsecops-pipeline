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

import { useContext, createContext } from 'react';
import { ViewNavigationEvent, Workspace } from '../../customTypes';

export interface WorkspacesContextApi extends ViewNavigationEvent {
  workspaceList: Workspace[];
  setWorkspaceList: (workspace: Workspace[]) => void;
  currentWorkspace: Workspace | null;
  removeWorkspace: (id: string) => Promise<void>;
  addWorkspace: (workspaceName: string) => void;
  renameWorkspace: (id: string, newWorkspaceName: string) => void;
  switchWorkspace: (workspace: Workspace | null) => void;
}

const initialState: WorkspacesContextApi = {
  workspaceList: [],
  setWorkspaceList: () => { },
  currentWorkspace: null,
  switchWorkspace: () => { },
  addWorkspace: () => { },
  removeWorkspace: () => Promise.resolve(),
  renameWorkspace: () => { },
};

export const WorkspacesContext = createContext<WorkspacesContextApi>(initialState);
export const useWorkspacesContext = () => useContext(WorkspacesContext);
