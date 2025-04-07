import { RefundRuleFactory } from './refund_rule_factory';
import { FullRefund } from './full_refund';
import { PartialRefund } from './partial_refund';
import { NoRefund } from './no_refund';

describe("RefundRuleFactory", () => {
    it("deve retornar FullRefund quando a reserva for cancelada com mais de 7 dias de antecedência", () => {
        const rule = RefundRuleFactory.getRefundRule(10);
        expect(rule).toBeInstanceOf(FullRefund);
    });

    it("deve retornar PartialRefund quando a reserva for cancelada entre 1 e 7 dias de antecedência", () => {
        const rule = RefundRuleFactory.getRefundRule(3);
        expect(rule).toBeInstanceOf(PartialRefund);
    });

    it("deve retornar NoRefund quando a reserva for cancelada com menos de 1 dia de antecedência", () => {
        it('should return NoRefund if daysUntilCheckIn < 1', () => {
            const rule = RefundRuleFactory.getRefundRule(0);
            expect(rule).toBeInstanceOf(NoRefund);
        });
    })
})