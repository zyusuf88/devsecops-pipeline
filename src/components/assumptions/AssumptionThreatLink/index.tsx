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

import { FC, useEffect, useState } from 'react';
import { useAssumptionLinksContext } from '../../../contexts/AssumptionLinksContext/context';
import { useThreatsContext } from '../../../contexts/ThreatsContext/context';
import { AssumptionLink } from '../../../customTypes';
import ThreatLinkView from '../../threats/ThreatLinkView';

export interface AssumptionThreatLinkProps {
  assumptionId: string;
}

const AssumptionThreatLinkComponent: FC<AssumptionThreatLinkProps> = ({
  assumptionId,
}) => {
  const { statementList } = useThreatsContext();
  const [assumptionLinks, setAssumptionLinks] = useState<AssumptionLink[]>([]);

  const { getAssumptionEntityLinks } = useAssumptionLinksContext();

  useEffect(() => {
    const _assumptionLinks = getAssumptionEntityLinks(assumptionId, 'Threat');
    setAssumptionLinks(_assumptionLinks || []);
  }, [getAssumptionEntityLinks, assumptionId]);

  const {
    addAssumptionLink,
    removeAssumptionLink,
  } = useAssumptionLinksContext();

  return (<ThreatLinkView
    threatList={statementList}
    linkedThreatIds={assumptionLinks.map(ml => ml.linkedId)}
    onAddThreatLink={(threatId) => addAssumptionLink({
      linkedId: threatId,
      assumptionId,
      type: 'Threat',
    })}
    onRemoveThreatLink={(threatId) => removeAssumptionLink(assumptionId, threatId)}
  />);
};

export default AssumptionThreatLinkComponent;
