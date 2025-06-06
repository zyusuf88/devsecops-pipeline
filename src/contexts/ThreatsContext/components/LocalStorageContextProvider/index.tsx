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

import { FC, PropsWithChildren, useCallback, useEffect } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { LOCAL_STORAGE_KEY_STATEMENT_LIST, LOCAL_STORAGE_KEY_EDITING_STATEMENT } from '../../../../configs/localStorageKeys';
import { TemplateThreatStatement } from '../../../../customTypes';
import removeLocalStorageKey from '../../../../utils/removeLocalStorageKey';
import { useGlobalSetupContext } from '../../../GlobalSetupContext/context';
import { ThreatsContext } from '../../context';
import useThreatExamples from '../../hooks/useThreatExamples';
import useThreats from '../../hooks/useThreats';
import { ThreatsContextProviderProps } from '../../types';

const getLocalStorageKey = (workspaceId: string | null) => {
  if (workspaceId) {
    return `${LOCAL_STORAGE_KEY_STATEMENT_LIST}_${workspaceId}`;
  }

  return LOCAL_STORAGE_KEY_STATEMENT_LIST;
};

const ThreatsContextProvider: FC<PropsWithChildren<ThreatsContextProviderProps>> = ({
  children,
  workspaceId: currentWorkspaceId,
  onThreatListView,
  onThreatEditorView,
}) => {
  const [editingStatement,
    setEditingStatement,
    { removeItem: removeEditingStatement }] = useLocalStorageState<TemplateThreatStatement | null>(LOCAL_STORAGE_KEY_EDITING_STATEMENT, {
    defaultValue: null,
  });

  const [statementList,
    setStatementList,
    { removeItem: removeStatementList }] = useLocalStorageState<TemplateThreatStatement[]>(getLocalStorageKey(currentWorkspaceId), {
    defaultValue: [],
  });

  const [filteredStatementList,
    setFilteredStatementList,
    { removeItem: removeFilteredStatementList }] = useLocalStorageState<TemplateThreatStatement[]>(getLocalStorageKey(currentWorkspaceId), {
    defaultValue: [],
  });

  const { composerMode, hasVisitBefore } = useGlobalSetupContext();

  const {
    threatStatementExamples,
    perFieldExamples,
    previousInputs,
  } = useThreatExamples(statementList);

  const {
    view,
    setView,
    handleAddStatement,
    handlRemoveStatement,
    handleEditStatement,
    handleSaveStatement,
    lenStatementList,
    editingStatementExist,
  } = useThreats(
    composerMode,
    statementList,
    setStatementList,
    filteredStatementList,
    setFilteredStatementList,
    editingStatement,
    setEditingStatement,
    onThreatEditorView,
  );

  const handleRemoveAllStatements = useCallback(async () => {
    removeStatementList();
    removeFilteredStatementList();
    removeEditingStatement();
  }, [removeEditingStatement, removeStatementList, removeFilteredStatementList]);

  const handleDeleteWorkspace = useCallback(async (workspaceId: string) => {
    setEditingStatement(null);
    window.setTimeout(() => {
      // to delete after the workspace is switched. Otherwise the default value is set again.
      removeLocalStorageKey(getLocalStorageKey(workspaceId));
    }, 1000);
  }, [setEditingStatement]);

  useEffect(() => {
    if ((composerMode === 'EditorOnly' && !editingStatementExist)
      || (composerMode === 'ThreatsOnly'
        && !hasVisitBefore
        && !editingStatementExist
        && lenStatementList === 0 && !currentWorkspaceId)) {
      handleAddStatement();
    }
  }, [composerMode, editingStatementExist, hasVisitBefore, lenStatementList, currentWorkspaceId, handleAddStatement]);

  return (<ThreatsContext.Provider value={{
    view,
    editingStatement,
    statementList,
    setStatementList,
    filteredStatementList,
    setFilteredStatementList,
    threatStatementExamples: threatStatementExamples as TemplateThreatStatement[],
    perFieldExamples,
    previousInputs,
    setView,
    setEditingStatement,
    addStatement: handleAddStatement,
    removeStatement: handlRemoveStatement,
    editStatement: handleEditStatement,
    saveStatement: handleSaveStatement,
    removeAllStatements: handleRemoveAllStatements,
    onDeleteWorkspace: handleDeleteWorkspace,
    onThreatListView,
    onThreatEditorView,
  }}>
    {children}
  </ThreatsContext.Provider>);
};

export default ThreatsContextProvider;
