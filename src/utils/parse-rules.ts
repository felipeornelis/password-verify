interface Rule {
    rule: string;
    value: number;
}

export function parseRules(pl: Rule[]) {
    const rules = {};

    for(const rule of pl) {
        Object.assign(rules, {
            [rule.rule]: rule.value
        })
    }

    return rules;
}