import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"

const faqItems = [
    {
        value: "item-1",
        trigger: "Combien de temps dure un projet ?",
        content: "Nous livrons vos premières solutions en un temps record, avec des délais établis avec vous selon la complexité.",
    },
    {
        value: "item-2",
        trigger: "Proposez-vous du sur-mesure ?",
        content: "Absolument. Chaque système est conçu spécifiquement pour supprimer vos frictions et s'adapter à vos processus internes.",
    },
    {
        value: "item-3",
        trigger: "Quel suivi après la livraison ?",
        content: "Nous assurons un suivi complet pour vérifier que tout fonctionne parfaitement et selon les solutions mises en place, une maintenance sera établie.",
    },
]

export function FaqSection() {
	return (
		<section id="faq" className="w-full py-12 md:py-20 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8 text-balance text-center">
					Questions fréquentes
				</h2>

				<Accordion
					type="single"
					collapsible
					defaultValue="item-1"
					className="w-full"
				>
					{faqItems.map((item) => (
						<AccordionItem
							key={item.value}
							value={item.value}
						>
							<AccordionTrigger>{item.trigger}</AccordionTrigger>
							<AccordionContent>{item.content}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	)
}
