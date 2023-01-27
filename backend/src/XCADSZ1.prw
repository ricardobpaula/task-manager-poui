#include 'protheus.ch'
#include 'fwmvcdef.ch'

Static cTitulo := 'Tarefas'

User Function XCADSZ1()
  Local oBrowse as Object

  oBrowse := FWMBrowse():New()
  oBrowse:SetAlias("SZ1")
  oBrowse:SetDescription(cTitulo)

  oBrowse:AddLegend("SZ1->Z1_FEITO == .T.", "GREEN", "Feito")
  oBrowse:AddLegend("SZ1->Z1_FEITO == .F.", "RED", "A fazer")

  oBrowse:Activate()
Return

Static Function MenuDef()
Local aRotina := {}

ADD OPTION aRotina TITLE 'Visualizar' ACTION 'VIEWDEF.XCADSZ1' OPERATION 2 ACCESS 0
ADD OPTION aRotina TITLE 'Incluir'    ACTION 'VIEWDEF.XCADSZ1' OPERATION 3 ACCESS 0
ADD OPTION aRotina TITLE 'Alterar'    ACTION 'VIEWDEF.XCADSZ1' OPERATION 4 ACCESS 0
ADD OPTION aRotina TITLE 'Excluir'    ACTION 'VIEWDEF.XCADSZ1' OPERATION 5 ACCESS 0

Return aRotina

Static Function ModelDef()
  Local oModel  as Object
  Local oStrSZ1 as Object

  oStrSZ1 := FWFormStruct(1, 'SZ1')

  oModel  := MPFormModel():New('MCADSZ1')
  oModel:AddFields('SZ1MASTER', /*cOwner*/, oStrSZ1)
  oModel:SetPrimaryKey({})

  oModel:SetDescription(cTitulo)
  oModel:GetModel('SZ1MASTER'):SetDescription(cTitulo)

Return oModel

Static Function ViewDef()
  Local oView   as Object
  Local oModel  as Object
  Local oStrSZ1 as Object

  oModel  := FWLoadModel('XCADSZ1')
  oStrSZ1 := FWFormStruct(2, 'SZ1')

  oView := FWFormView():New()
  oView:SetModel(oModel)

  oView:AddField('VIEW_SZ1', oStrSZ1, 'SZ1MASTER')

  oView:EnableTitleView('VIEW_SZ1', cTitulo)

Return oView
